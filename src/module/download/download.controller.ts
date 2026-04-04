import path from 'path'
import fs from 'fs'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { OrderModel } from '../shop-order/order.model'
import { EbookModel } from '../ebook/ebook.model'
import { Types } from 'mongoose'

const downloadPdf = catchAsync(async (req, res) => {
  const { orderId, ebookId } = req.params

  // 1. Verify order is PAID and contains this ebook
  const order = await OrderModel.findOne({
    _id: new Types.ObjectId(orderId),
    status: 'PAID',
    'items.ebookId': new Types.ObjectId(ebookId),
  })

  if (!order) {
    res.status(StatusCodes.FORBIDDEN).json({
      status: false,
      message: 'No paid order found for this ebook',
    })
    return
  }

  // 2. Get ebook PDF path
  const ebook = await EbookModel.findById(ebookId)
  if (!ebook || !ebook.pdfPath) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: false,
      message: 'PDF not found',
    })
    return
  }

  // 3. Resolve and send file
  const pdfFullPath = path.resolve(ebook.pdfPath)
  if (!fs.existsSync(pdfFullPath)) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: false,
      message: 'PDF file not found on server',
    })
    return
  }

  const filename = `${ebook.slug}.pdf`
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  fs.createReadStream(pdfFullPath).pipe(res)
})

export const DownloadController = { downloadPdf }