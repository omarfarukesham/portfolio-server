"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const blogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Title must be provided and must be a string",
        })
            .min(5, { message: "Title must be at least 5 characters long" })
            .max(100, { message: "Title cannot exceed 100 characters" }),
        content: zod_1.z
            .string({
            required_error: "Content must be provided and must be a string",
        })
            .min(10, { message: "Content must be at least 10 characters long" }),
        image: zod_1.z
            .string({
            required_error: "Image URL must be provided and must be a string",
        }),
        author: zod_1.z
            .string({
            required_error: "Author ID must be provided and must be a string",
        }).optional(),
        // .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid ObjectId format for author" }),
        isPublished: zod_1.z
            .boolean()
            .optional()
            .default(false),
    }),
});
exports.BlogValidation = {
    blogValidationSchema,
};
