"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    content: {
        type: String,
        required: true,
        minlength: 10,
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
