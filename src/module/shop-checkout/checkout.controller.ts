import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CheckoutService } from './checkout.service'
import config from '../../config'

const init = catchAsync(async (req, res) => {
  const { email, phone, items, customerName } = req.body
  const result = await CheckoutService.initPayment({ email, phone, items, customerName })
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Payment initiated',
    data: result,
  })
})

// SSLCOMMERZ POSTs to these endpoints, then we redirect the user
const success = catchAsync(async (req, res) => {
  const order = await CheckoutService.handleSuccess(req.body)
  const identityId = order?.identityId?.toString() || ''
  res.redirect(`${config.frontend_url}/dashboard?identity=${identityId}`)
})

const fail = catchAsync(async (req, res) => {
  await CheckoutService.handleFail(req.body)
  res.redirect(`${config.frontend_url}/dashboard?payment=failed`)
})

const cancel = catchAsync(async (req, res) => {
  await CheckoutService.handleCancel(req.body)
  res.redirect(`${config.frontend_url}/dashboard?payment=cancelled`)
})

// IPN is server-to-server, no redirect
const ipn = catchAsync(async (req, res) => {
  await CheckoutService.handleSuccess(req.body)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'IPN received',
    data: null,
  })
})

export const CheckoutController = { init, success, fail, cancel, ipn }