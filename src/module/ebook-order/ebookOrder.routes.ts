import { Router } from 'express'
import { EbookOrderController } from './ebookOrder.controller'

const router = Router()

router.post('/', EbookOrderController.create)
router.get('/', EbookOrderController.getAll)

export const ebookOrderRoutes = router
