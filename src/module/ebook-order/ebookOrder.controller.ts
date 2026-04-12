import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ebookOrderSchema } from './ebookOrder.validation'
import { EbookOrderService } from './ebookOrder.service'

const create = catchAsync(async (req, res) => {
  const parsed = ebookOrderSchema.safeParse(req.body)

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message || 'Validation failed'
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: firstError,
      data: null,
    })
  }

  try {
    const order = await EbookOrderService.createEbookOrder(parsed.data)
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Order placed successfully. You will receive the eBook via email shortly.',
      data: order,
    })
  } catch (err: any) {
    if (err.message === 'This Transaction ID has already been used') {
      return sendResponse(res, {
        statusCode: StatusCodes.CONFLICT,
        message: err.message,
        data: null,
      })
    }
    throw err
  }
})

const getAll = catchAsync(async (_req, res) => {
  const orders = await EbookOrderService.getAllEbookOrders()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Orders fetched',
    data: orders,
  })
})

export const EbookOrderController = { create, getAll }
