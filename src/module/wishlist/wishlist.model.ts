import { Schema, model, Document, Types } from 'mongoose'

export interface IWishlistItem extends Document {
  identityId: Types.ObjectId
  ebookId: Types.ObjectId
  createdAt: Date
}

const wishlistItemSchema = new Schema<IWishlistItem>(
  {
    identityId: { type: Schema.Types.ObjectId, ref: 'UserIdentity', required: true },
    ebookId: { type: Schema.Types.ObjectId, ref: 'Ebook', required: true },
  },
  { timestamps: true },
)

wishlistItemSchema.index({ identityId: 1, ebookId: 1 }, { unique: true })

export const WishlistItemModel = model<IWishlistItem>('WishlistItem', wishlistItemSchema)