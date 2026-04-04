import { Router } from 'express'
import { CheckoutController } from './checkout.controller'

const router = Router()

router.post('/init', CheckoutController.init)
router.post('/success', CheckoutController.success)
router.post('/fail', CheckoutController.fail)
router.post('/cancel', CheckoutController.cancel)
router.post('/ipn', CheckoutController.ipn)

export const shopCheckoutRoutes = router