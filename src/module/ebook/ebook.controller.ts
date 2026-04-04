import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { EbookService } from './ebook.service'

const getAll = catchAsync(async (req, res) => {
  const ebooks = await EbookService.getAllEbooks()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Ebooks fetched successfully',
    data: ebooks,
  })
})

const getBySlug = catchAsync(async (req, res) => {
  const ebook = await EbookService.getEbookBySlug(req.params.slug)
  if (!ebook) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Ebook not found',
      data: null,
    })
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Ebook fetched successfully',
    data: ebook,
  })
})

const create = catchAsync(async (req, res) => {
  const ebook = await EbookService.createEbook(req.body)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Ebook created successfully',
    data: ebook,
  })
})

const update = catchAsync(async (req, res) => {
  const ebook = await EbookService.updateEbook(req.params.slug, req.body)
  if (!ebook) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Ebook not found',
      data: null,
    })
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Ebook updated successfully',
    data: ebook,
  })
})

const remove = catchAsync(async (req, res) => {
  const ebook = await EbookService.deleteEbook(req.params.slug)
  if (!ebook) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Ebook not found',
      data: null,
    })
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Ebook deleted successfully',
    data: ebook,
  })
})

export const EbookController = { getAll, getBySlug, create, update, remove }