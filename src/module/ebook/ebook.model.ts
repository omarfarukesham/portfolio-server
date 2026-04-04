import { Schema, model, Document } from 'mongoose'

export interface IEbook extends Document {
  slug: string
  title: string
  subtitle: string
  description: string
  outcomes: string[]
  price: number
  oldPrice?: number
  badge?: string
  coverImage: string
  pdfPath: string
  category: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ebookSchema = new Schema<IEbook>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    outcomes: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number },
    badge: { type: String },
    coverImage: { type: String, required: true },
    pdfPath: { type: String, required: true },
    category: { type: String, default: 'Safety' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export const EbookModel = model<IEbook>('Ebook', ebookSchema)