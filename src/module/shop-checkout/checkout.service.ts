/* eslint-disable @typescript-eslint/no-var-requires */
const SSLCommerzPayment = require('sslcommerz-lts')
import config from '../../config'
import { IdentityService } from '../identity/identity.service'
import { EbookModel } from '../ebook/ebook.model'
import { OrderModel, IOrder } from '../shop-order/order.model'
import { PaymentModel } from '../shop-order/payment.model'
import { Types } from 'mongoose'

function generateTranId(): string {
  return `LS_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}

type InitCheckoutInput = {
  email?: string
  phone?: string
  items: { ebookId: string; quantity?: number }[]
  customerName?: string
}

const initPayment = async (input: InitCheckoutInput) => {
  const { email, phone, items, customerName } = input

  if (!email && !phone) throw new Error('Email or phone is required')
  if (!items || items.length === 0) throw new Error('At least one item is required')

  // 1. Resolve identity
  const identity = await IdentityService.findOrCreate({ email, phone })

  // 2. Fetch ebook details — accept both ObjectId and slug
  const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
  const slugs = items.filter((i) => !isObjectId(i.ebookId)).map((i) => i.ebookId)
  const ids = items.filter((i) => isObjectId(i.ebookId)).map((i) => new Types.ObjectId(i.ebookId))

  const ebooks = await EbookModel.find({
    isActive: true,
    $or: [
      ...(ids.length ? [{ _id: { $in: ids } }] : []),
      ...(slugs.length ? [{ slug: { $in: slugs } }] : []),
    ],
  })

  if (ebooks.length === 0) throw new Error('No valid ebooks found')

  const orderItems = ebooks.map((ebook) => ({
    ebookId: ebook._id as Types.ObjectId,
    title: ebook.title,
    price: ebook.price,
  }))

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0)
  const tranId = generateTranId()

  // 3. Create order (PENDING)
  const order = await OrderModel.create({
    identityId: identity._id,
    items: orderItems,
    totalPrice,
    status: 'PENDING',
    tranId,
  })

  // 4. Create payment record (PENDING)
  await PaymentModel.create({
    orderId: order._id,
    tranId,
    status: 'PENDING',
    amount: totalPrice,
  })

  // 5. Init SSLCOMMERZ
  const sslcz = new SSLCommerzPayment(
    config.ssl.store_id,
    config.ssl.store_passwd,
    config.ssl.is_live,
  )

  const productNames = ebooks.map((e) => e.title).join(', ')

  const sslData = {
    total_amount: totalPrice,
    currency: 'BDT',
    tran_id: tranId,
    success_url: `${config.backend_url}/api/shop-checkout/success`,
    fail_url: `${config.backend_url}/api/shop-checkout/fail`,
    cancel_url: `${config.backend_url}/api/shop-checkout/cancel`,
    ipn_url: `${config.backend_url}/api/shop-checkout/ipn`,
    shipping_method: 'NO',
    product_name: productNames,
    product_category: 'eBook',
    product_profile: 'non-physical-goods',
    cus_name: customerName || 'Customer',
    cus_email: email || 'no-email@learnsafety.pro',
    cus_phone: phone || '01700000000',
    cus_add1: 'Dhaka',
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    value_a: (order._id as Types.ObjectId).toString(),
    value_b: (identity._id as Types.ObjectId).toString(),
  }

  const apiResponse = await sslcz.init(sslData)
  console.log('SSLCOMMERZ init response:', JSON.stringify(apiResponse, null, 2))

  if (!apiResponse?.GatewayPageURL) {
    // Mark order as failed if gateway init fails
    await OrderModel.findByIdAndUpdate(order._id, { status: 'FAILED' })
    await PaymentModel.findOneAndUpdate({ tranId }, { status: 'FAILED' })
    throw new Error(
      `Payment gateway initialization failed: ${apiResponse?.failedreason || apiResponse?.status || 'Unknown error'}`,
    )
  }

  return {
    gatewayUrl: apiResponse.GatewayPageURL,
    tranId,
    orderId: order._id,
  }
}

const handleSuccess = async (payload: Record<string, string>) => {
  const { tran_id, val_id, card_type, bank_tran_id } = payload
  if (!tran_id) throw new Error('Transaction ID missing')

  // Idempotent: skip if already PAID
  const order = await OrderModel.findOne({ tranId: tran_id })
  if (!order) throw new Error('Order not found')
  if (order.status === 'PAID') return order

  // Validate with SSLCOMMERZ
  const sslcz = new SSLCommerzPayment(
    config.ssl.store_id,
    config.ssl.store_passwd,
    config.ssl.is_live,
  )

  const validationResponse = await sslcz.validate({ val_id })

  if (validationResponse.status === 'VALID' || validationResponse.status === 'VALIDATED') {
    order.status = 'PAID'
    await order.save()

    await PaymentModel.findOneAndUpdate(
      { tranId: tran_id },
      {
        status: 'PAID',
        valId: val_id,
        cardType: card_type,
        bankTranId: bank_tran_id,
        gatewayResponse: payload,
      },
    )
  } else {
    order.status = 'FAILED'
    await order.save()
    await PaymentModel.findOneAndUpdate(
      { tranId: tran_id },
      { status: 'FAILED', gatewayResponse: payload },
    )
  }

  return order
}

const handleFail = async (payload: Record<string, string>) => {
  const { tran_id } = payload
  if (!tran_id) return

  const order = await OrderModel.findOne({ tranId: tran_id })
  if (!order || order.status === 'PAID') return order

  order.status = 'FAILED'
  await order.save()
  await PaymentModel.findOneAndUpdate(
    { tranId: tran_id },
    { status: 'FAILED', gatewayResponse: payload },
  )
  return order
}

const handleCancel = async (payload: Record<string, string>) => {
  const { tran_id } = payload
  if (!tran_id) return

  const order = await OrderModel.findOne({ tranId: tran_id })
  if (!order || order.status === 'PAID') return order

  order.status = 'CANCELLED'
  await order.save()
  await PaymentModel.findOneAndUpdate(
    { tranId: tran_id },
    { status: 'CANCELLED', gatewayResponse: payload },
  )
  return order
}

export const CheckoutService = { initPayment, handleSuccess, handleFail, handleCancel }