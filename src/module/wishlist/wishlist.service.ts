import { Types } from 'mongoose'
import { WishlistItemModel } from './wishlist.model'
import { EbookModel } from '../ebook/ebook.model'

const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)

const resolveEbookId = async (ebookIdOrSlug: string): Promise<Types.ObjectId> => {
  if (isObjectId(ebookIdOrSlug)) return new Types.ObjectId(ebookIdOrSlug)
  const ebook = await EbookModel.findOne({ slug: ebookIdOrSlug })
  if (!ebook) throw new Error('Ebook not found')
  return ebook._id as Types.ObjectId
}

const addItem = async (identityId: string, ebookIdOrSlug: string) => {
  const ebookId = await resolveEbookId(ebookIdOrSlug)
  const existing = await WishlistItemModel.findOne({
    identityId: new Types.ObjectId(identityId),
    ebookId,
  })
  if (existing) return existing

  return WishlistItemModel.create({
    identityId: new Types.ObjectId(identityId),
    ebookId,
  })
}

const removeItem = async (identityId: string, ebookId: string) => {
  return WishlistItemModel.findOneAndDelete({
    identityId: new Types.ObjectId(identityId),
    ebookId: new Types.ObjectId(ebookId),
  })
}

const getByIdentity = async (identityId: string) => {
  return WishlistItemModel.find({
    identityId: new Types.ObjectId(identityId),
  }).populate('ebookId')
}

export const WishlistService = { addItem, removeItem, getByIdentity }