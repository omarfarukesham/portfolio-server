"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import validateRequest from '../../middlewares/validateRequest'
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const admin_controller_1 = require("./admin.controller");
const adminRouter = (0, express_1.Router)();
adminRouter.patch('/users/:userId/block', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.userBlockByAdmin);
adminRouter.delete('/blogs/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), admin_controller_1.adminController.deleteBlogByAdmin);
exports.default = adminRouter;
// /api/admin/users/:userId/block
// /api/admin/blogs/:id
