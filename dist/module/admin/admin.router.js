"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const admin_controller_1 = require("./admin.controller");
const adminRouter = (0, express_1.Router)();
// Dashboard stats
adminRouter.get('/stats', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.getStats);
// Customers (UserIdentity)
adminRouter.get('/customers', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.getAllCustomers);
// Orders
adminRouter.get('/orders', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.getAllOrders);
adminRouter.patch('/orders/:id/status', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.updateOrderStatus);
// Payments
adminRouter.get('/payments', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.getAllPayments);
// Ebooks CRUD
adminRouter.get('/ebooks', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.getAllEbooks);
adminRouter.post('/ebooks', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.createEbook);
adminRouter.patch('/ebooks/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.updateEbook);
adminRouter.delete('/ebooks/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.deleteEbook);
// Fire Safety Products CRUD
adminRouter.get('/fire-products', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.getAllFireProducts);
adminRouter.post('/fire-products', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.createFireProduct);
adminRouter.patch('/fire-products/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.updateFireProduct);
adminRouter.delete('/fire-products/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.deleteFireProduct);
// Blogs
adminRouter.delete('/blogs/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.deleteBlogByAdmin);
exports.default = adminRouter;
