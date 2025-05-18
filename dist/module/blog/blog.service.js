"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = void 0;
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   payload.role = 'admin';
    const result = (yield blog_model_1.default.create(payload)).populate("author", "name email role");
    return result;
});
// search, filtering and pagination functions for blog posts
const getBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ["title", "content"];
    const blogs = new querybuilder_1.default(blog_model_1.default.find(), query).search(searchableFields).filter().sort().select();
    const result = yield blogs.modelQuery.populate("author", "name email role");
    return result;
});
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findById(id).populate("author", "name email role");
    return result;
});
const updateBlog = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deleteBlog = (blogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    //  console.log(blogId, userId)
    const result = yield blog_model_1.default.findByIdAndDelete({ _id: blogId, author: userId });
    if (result) {
        throw new Error('Could not delete');
    }
    return result;
});
exports.blogService = {
    createBlog,
    getBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
