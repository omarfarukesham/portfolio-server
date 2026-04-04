import { Router } from 'express'
import { WishlistController } from './wishlist.controller'

const router = Router()

router.post('/', WishlistController.add)
router.get('/:identityId', WishlistController.getByIdentity)
router.delete('/:identityId/:ebookId', WishlistController.remove)

export const wishlistRoutes = router