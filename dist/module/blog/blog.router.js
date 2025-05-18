"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const blogRouter = (0, express_1.Router)();
// blogRouter.post('/', blogController.createBlog)
blogRouter.post('/', (0, auth_1.default)(user_constants_1.USER_ROLE.admin, user_constants_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.blogValidationSchema), blog_controller_1.blogController.createBlog);
// blogRouter.get('/:id', auth(USER_ROLE.admin, USER_ROLE.user), blogController.getSingleBlog)
blogRouter.get('/:id', blog_controller_1.blogController.getSingleBlog);
blogRouter.patch('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin, user_constants_1.USER_ROLE.user), blog_controller_1.blogController.updateBlog);
blogRouter.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin, user_constants_1.USER_ROLE.user), blog_controller_1.blogController.deleteBlog);
blogRouter.get('/', blog_controller_1.blogController.getBlogs);
exports.default = blogRouter;
