/* eslint-disable @typescript-eslint/no-var-requires */
const SSLCommerzPayment = require('sslcommerz-lts')
import config from '../../config'
import { IdentityService } from '../identity/identity.service'
import { EbookModel } from '../ebook/ebook.model'
import { FireProductModel } from '../fire-product/fireProduct.model'
import { OrderModel } from '../shop-order/order.model'
import { PaymentModel } from '../shop-order/payment.model'
import { Types } from 'mongoose'

function generateTranId(): string {
  return `LS_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}

type InitCheckoutItem = {
  ebookId?: string
  fireProductId?: string
  itemType?: 'ebook' | 'fire-product'
  quantity?: number
}

type InitCheckoutInput = {
  email?: string
  phone?: string
  items: InitCheckoutItem[]
  customerName?: string
}

const initPayment = async (input: InitCheckoutInput) => {
  const { email, phone, items, customerName } = input

  if (!email && !phone) throw new Error('Email or phone is required')
  if (!items || items.length === 0) throw new Error('At least one item is required')

  // 1. Resolve identity
  const identity = await IdentityService.findOrCreate({ email, phone })

  // 2. Separate ebook and fire-product items
  const ebookInputs = items.filter(
    (i) => i.itemType === 'ebook' || (!i.itemType && i.ebookId),
  )
  const fireProductInputs = items.filter((i) => i.itemType === 'fire-product')

  const orderItems: {
    ebookId?: Types.ObjectId
    fireProductId?: Types.ObjectId
    itemType: 'ebook' | 'fire-product'
    title: string
    price: number
    quantity: number
  }[] = []

  // 3. Fetch ebooks if any
  if (ebookInputs.length > 0) {
    const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
    const ebookIds = ebookInputs.map((i) => i.ebookId!).filter(Boolean)
    const slugs = ebookIds.filter((id) => !isObjectId(id))
    const ids = ebookIds.filter((id) => isObjectId(id)).map((id) => new Types.ObjectId(id))

    const ebooks = await EbookModel.find({
      isActive: true,
      $or: [
        ...(ids.length ? [{ _id: { $in: ids } }] : []),
        ...(slugs.length ? [{ slug: { $in: slugs } }] : []),
      ],
    })

    for (const ebook of ebooks) {
      const inputItem = ebookInputs.find(
        (i) => i.ebookId === (ebook._id as Types.ObjectId).toString() || i.ebookId === ebook.slug,
      )
      orderItems.push({
        ebookId: ebook._id as Types.ObjectId,
        itemType: 'ebook',
        title: ebook.title,
        price: ebook.price,
        quantity: inputItem?.quantity || 1,
      })
    }
  }

  // 4. Fetch fire products if any
  if (fireProductInputs.length > 0) {
    const fireIds = fireProductInputs
      .map((i) => i.fireProductId!)
      .filter(Boolean)
      .map((id) => new Types.ObjectId(id))

    const fireProducts = await FireProductModel.find({
      status: 'active',
      _id: { $in: fireIds },
    })

    for (const fp of fireProducts) {
      const inputItem = fireProductInputs.find(
        (i) => i.fireProductId === (fp._id as Types.ObjectId).toString(),
      )
      orderItems.push({
        fireProductId: fp._id as Types.ObjectId,
        itemType: 'fire-product',
        title: fp.name,
        price: fp.price,
        quantity: inputItem?.quantity || 1,
      })
    }
  }

  if (orderItems.length === 0) throw new Error('No valid products found')

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tranId = generateTranId()

  // 5. Create order (PENDING)
  const order = await OrderModel.create({
    identityId: identity._id,
    items: orderItems,
    totalPrice,
    status: 'PENDING',
    tranId,
  })

  // 6. Create payment record (PENDING)
  await PaymentModel.create({
    orderId: order._id,
    tranId,
    status: 'PENDING',
    amount: totalPrice,
  })

  // 7. Determine product info for SSLCOMMERZ
  const hasFireProducts = fireProductInputs.length > 0
  const hasEbooks = ebookInputs.length > 0
  const productNames = orderItems.map((i) => i.title).join(', ')
  const productCategory = hasEbooks && hasFireProducts
    ? 'eBook & Fire Safety'
    : hasFireProducts
      ? 'Fire Safety Product'
      : 'eBook'
  const productProfile = hasFireProducts ? 'physical-goods' : 'non-physical-goods'
  const shippingMethod = hasFireProducts ? 'Courier' : 'NO'

  // 8. Init SSLCOMMERZ
  const sslcz = new SSLCommerzPayment(
    config.ssl.store_id,
    config.ssl.store_passwd,
    config.ssl.is_live,
  )

  const sslData = {
    total_amount: totalPrice,
    currency: 'BDT',
    tran_id: tranId,
    success_url: `${config.backend_url}/api/shop-checkout/success`,
    fail_url: `${config.backend_url}/api/shop-checkout/fail`,
    cancel_url: `${config.backend_url}/api/shop-checkout/cancel`,
    ipn_url: `${config.backend_url}/api/shop-checkout/ipn`,
    shipping_method: shippingMethod,
    product_name: productNames,
    product_category: productCategory,
    product_profile: productProfile,
    cus_name: customerName || 'Customer',
    cus_email: email || 'no-email@learnsafety.pro',
    cus_phone: phone || '01700000000',
    cus_add1: 'Dhaka',
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    ...(hasFireProducts && {
      ship_name: customerName || 'Customer',
      ship_add1: 'Dhaka',
      ship_city: 'Dhaka',
      ship_country: 'Bangladesh',
      ship_postcode: '1000',
    }),
    value_a: (order._id as Types.ObjectId).toString(),
    value_b: (identity._id as Types.ObjectId).toString(),
  }

  const apiResponse = await sslcz.init(sslData)
  console.log('SSLCOMMERZ init response:', JSON.stringify(apiResponse, null, 2))

  if (!apiResponse?.GatewayPageURL) {
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

  const order = await OrderModel.findOne({ tranId: tran_id })
  if (!order) throw new Error('Order not found')
  if (order.status === 'PAID') return order

  const sslcz = new SSLCommerzPayment(
    config.ssl.store_id,
    config.ssl.store_passwd,
    config.ssl.is_live,
  )

  const validationResponse = await sslcz.validate({ val_id })

  if (validationResponse.status === 'VALID' || validationResponse.status === 'VALIDATED') {
    order.status = 'PAID'
    await order.save()

    // Decrement stock for fire products
    for (const item of order.items) {
      if (item.itemType === 'fire-product' && item.fireProductId) {
        await FireProductModel.findByIdAndUpdate(item.fireProductId, {
          $inc: { stock: -(item.quantity || 1) },
        })
      }
    }

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
