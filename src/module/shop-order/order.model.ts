import { Schema, model, Document, Types } from 'mongoose'

export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'

export interface IOrderItem {
  ebookId: Types.ObjectId
  title: string
  price: number
}

export interface IOrder extends Document {
  identityId: Types.ObjectId
  items: IOrderItem[]
  totalPrice: number
  status: OrderStatus
  tranId: string
  createdAt: Date
  updatedAt: Date
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    ebookId: { type: Schema.Types.ObjectId, ref: 'Ebook', required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
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
  },
  { timestamps: true },
)

export const OrderModel = model<IOrder>('ShopOrder', orderSchema)