import { Router } from 'express'
import { DownloadController } from './download.controller'

const router = Router()

router.get('/:orderId/:ebookId', DownloadController.downloadPdf)

export const downloadRoutes = router