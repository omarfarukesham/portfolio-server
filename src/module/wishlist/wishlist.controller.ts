import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { WishlistService } from './wishlist.service'
import { IdentityService } from '../identity/identity.service'

const add = catchAsync(async (req, res) => {
  const { email, phone, ebookId } = req.body
  if ((!email && !phone) || !ebookId) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Identity (email or phone) and ebookId are required',
      data: null,
    })
  }

  const identity = await IdentityService.findOrCreate({ email, phone })
  const item = await WishlistService.addItem(identity._id as string, ebookId)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Added to wishlist',
    data: item,
  })
})

const remove = catchAsync(async (req, res) => {
  const { identityId, ebookId } = req.params
  await WishlistService.removeItem(identityId, ebookId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Removed from wishlist',
    data: null,
  })
})

const getByIdentity = catchAsync(async (req, res) => {
  const { identityId } = req.params
  const items = await WishlistService.getByIdentity(identityId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Wishlist fetched',
    data: items,
  })
})

export const WishlistController = { add, remove, getByIdentity }