import { Router } from 'express'
import { EbookController } from './ebook.controller'

const router = Router()

router.get('/', EbookController.getAll)
router.get('/:slug', EbookController.getBySlug)
router.post('/', EbookController.create)
router.patch('/:slug', EbookController.update)
router.delete('/:slug', EbookController.remove)

export const ebookRoutes = router