import { Schema, model, Document, Types } from 'mongoose'

export interface IPayment extends Document {
  orderId: Types.ObjectId
  tranId: string
  valId?: string
  status: string
  amount: number
  cardType?: string
  bankTranId?: string
  gatewayResponse?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

const paymentSchema = new Schema<IPayment>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'ShopOrder', required: true },
    tranId: { type: String, required: true },
    valId: { type: String },
    status: { type: String, required: true, default: 'PENDING' },
    amount: { type: Number, required: true },
    cardType: { type: String },
    bankTranId: { type: String },
    gatewayResponse: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
)

export const PaymentModel = model<IPayment>('Payment', paymentSchema)