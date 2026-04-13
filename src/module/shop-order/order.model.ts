import { Schema, model, Document, Types } from 'mongoose'

export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'
export type PaymentMethod = 'bkash' | 'nagad'

export type OrderItemType = 'ebook' | 'fire-product'

export interface IOrderItem {
  ebookId?: Types.ObjectId
  fireProductId?: Types.ObjectId
  itemType: OrderItemType
  title: string
  price: number
  quantity: number
}

export interface IOrder extends Document {
  identityId: Types.ObjectId
  items: IOrderItem[]
  totalPrice: number
  status: OrderStatus
  tranId: string
  paymentMethod: PaymentMethod
  emailSent: boolean
  createdAt: Date
  updatedAt: Date
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    ebookId: { type: Schema.Types.ObjectId, ref: 'Ebook' },
    fireProductId: { type: Schema.Types.ObjectId, ref: 'FireProduct' },
    itemType: { type: String, enum: ['ebook', 'fire-product'], default: 'ebook' },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
  },
  { _id: false },
)

const orderSchema = new Schema<IOrder>(
  {
    identityId: { type: Schema.Types.ObjectId, ref: 'UserIdentity', required: true },
    items: { type: [orderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'CANCELLED'],
      default: 'PENDING',
    },
    tranId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, enum: ['bkash', 'nagad'], required: true },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const OrderModel = model<IOrder>('ShopOrder', orderSchema)