import { IdentityService } from '../identity/identity.service'
import { OrderModel } from '../shop-order/order.model'
import { WishlistItemModel } from '../wishlist/wishlist.model'

const getDashboard = async (identifier: string) => {
  const identity = await IdentityService.findByIdentifier(identifier)
  if (!identity) {
    return { identity: null, purchases: [], wishlist: [] }
  }

  const [purchases, wishlist] = await Promise.all([
    OrderModel.find({ identityId: identity._id, status: 'PAID' })
      .populate('items.ebookId')
      .sort({ createdAt: -1 }),
    WishlistItemModel.find({ identityId: identity._id }).populate('ebookId'),
  ])

  return { identity, purchases, wishlist }
}

const getDashboardById = async (identityId: string) => {
  const [purchases, wishlist] = await Promise.all([
    OrderModel.find({ identityId, status: 'PAID' })
      .populate('items.ebookId')
      .sort({ createdAt: -1 }),
    WishlistItemModel.find({ identityId }).populate('ebookId'),
  ])

  return { purchases, wishlist }
}

export const DashboardService = { getDashboard, getDashboardById }