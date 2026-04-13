import { IdentityService } from '../identity/identity.service'
import { OrderModel } from '../shop-order/order.model'
import { EbookOrderInput } from './ebookOrder.validation'

const EBOOK_TITLE = 'আগুনের বেসিক নলেজ (Fire Safety Basics)'
const EBOOK_PRICE = 199

const createEbookOrder = async (input: EbookOrderInput) => {
  // 1. Find or create user identity
  const identity = await IdentityService.findOrCreate({
    email: input.email,
    phone: input.phone.replace(/\s|-/g, ''),
  })

  // 2. Check for duplicate transaction ID
  const existing = await OrderModel.findOne({ tranId: input.transactionId })
  if (existing) {
    throw new Error('This Transaction ID has already been used')
  }

  // 3. Create order as PENDING (admin will verify and mark PAID)
  const order = await OrderModel.create({
    identityId: identity._id,
    items: [
      {
        itemType: 'ebook',
        title: EBOOK_TITLE,
        price: EBOOK_PRICE,
        quantity: 1,
      },
    ],
    totalPrice: EBOOK_PRICE,
    status: 'PENDING',
    tranId: input.transactionId,
    paymentMethod: input.paymentMethod,
  })

  return order
}

const getAllEbookOrders = async () => {
  return OrderModel.find()
    .populate('identityId')
    .sort({ createdAt: -1 })
}

export const EbookOrderService = { createEbookOrder, getAllEbookOrders }
