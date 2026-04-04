import { Router } from 'express'
import { FireProductController } from './fireProduct.controller'

const router = Router()

router.get('/', FireProductController.getAll)
router.get('/:slug', FireProductController.getBySlug)

export const fireProductRoutes = router
