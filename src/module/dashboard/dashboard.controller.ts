import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { DashboardService } from './dashboard.service'

const get = catchAsync(async (req, res) => {
  const { email, phone, identity } = req.query as Record<string, string>

  // Support lookup by identityId or by email/phone
  if (identity) {
    const data = await DashboardService.getDashboardById(identity)
    return sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Dashboard fetched',
      data,
    })
  }

  const identifier = email || phone
  if (!identifier) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Provide email, phone, or identity param',
      data: null,
    })
  }

  const data = await DashboardService.getDashboard(identifier)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Dashboard fetched',
    data,
  })
})

export const DashboardController = { get }