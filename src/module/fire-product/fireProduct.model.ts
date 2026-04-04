import { Schema, model, Document } from 'mongoose'

export interface IFireProduct extends Document {
  name: string
  slug: string
  description: string
  price: number
  oldPrice?: number
  category: 'extinguisher' | 'alarm' | 'first-aid' | 'safety-sign' | 'other'
  images: string[]
  stock: number
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

const fireProductSchema = new Schema<IFireProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number },
    category: {
      type: String,
      enum: ['extinguisher', 'alarm', 'first-aid', 'safety-sign', 'other'],
      required: true,
    },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true },
)

export const FireProductModel = model<IFireProduct>('FireProduct', fireProductSchema)
