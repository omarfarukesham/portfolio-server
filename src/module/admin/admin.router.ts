import { Router } from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constants'
import { adminController } from './admin.controller'

const adminRouter = Router()

// Dashboard stats
adminRouter.get('/stats', auth(USER_ROLE.admin), adminController.getStats)

// Customers (UserIdentity)
adminRouter.get('/customers', auth(USER_ROLE.admin), adminController.getAllCustomers)

// Orders
adminRouter.get('/orders', auth(USER_ROLE.admin), adminController.getAllOrders)
adminRouter.patch('/orders/:id/status', auth(USER_ROLE.admin), adminController.updateOrderStatus)

// Payments
adminRouter.get('/payments', auth(USER_ROLE.admin), adminController.getAllPayments)

// Ebooks CRUD
adminRouter.get('/ebooks', auth(USER_ROLE.admin), adminController.getAllEbooks)
adminRouter.post('/ebooks', auth(USER_ROLE.admin), adminController.createEbook)
adminRouter.patch('/ebooks/:id', auth(USER_ROLE.admin), adminController.updateEbook)
adminRouter.delete('/ebooks/:id', auth(USER_ROLE.admin), adminController.deleteEbook)

// Fire Safety Products CRUD
adminRouter.get('/fire-products', auth(USER_ROLE.admin), adminController.getAllFireProducts)
adminRouter.post('/fire-products', auth(USER_ROLE.admin), adminController.createFireProduct)
adminRouter.patch('/fire-products/:id', auth(USER_ROLE.admin), adminController.updateFireProduct)
adminRouter.delete('/fire-products/:id', auth(USER_ROLE.admin), adminController.deleteFireProduct)

// Blogs
adminRouter.delete('/blogs/:id', auth(USER_ROLE.admin), adminController.deleteBlogByAdmin)

export default adminRouter
