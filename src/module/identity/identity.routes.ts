import { Router } from 'express'
import { IdentityController } from './identity.controller'

const router = Router()

router.post('/lookup', IdentityController.lookup)

export const identityRoutes = router