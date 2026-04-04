import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { IdentityService } from './identity.service'

const lookup = catchAsync(async (req, res) => {
  const { email, phone } = req.body
  if (!email && !phone) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Email or phone is required',
      data: null,
    })
  }
  const identity = await IdentityService.findOrCreate({ email, phone })
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Identity resolved',
    data: identity,
  })
})

export const IdentityController = { lookup }