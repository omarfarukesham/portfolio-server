import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FireProductService } from './fireProduct.service'

const getAll = catchAsync(async (_req, res) => {
  const result = await FireProductService.getAll()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Fire products fetched',
    data: result,
  })
})

const getBySlug = catchAsync(async (req, res) => {
  const result = await FireProductService.getBySlug(req.params.slug)
  if (!result) throw new Error('Product not found')
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Fire product fetched',
    data: result,
  })
})

export const FireProductController = {
  getAll,
  getBySlug,
}
