"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const product_interface_1 = require("./product.interface");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
        minlength: [3, 'Title must be at least 3 characters long']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        minlength: [3, 'Author name must be at least 3 characters long']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    category: {
        type: String,
        enum: {
            values: Object.values(product_interface_1.Category),
            message: '{VALUE} is not a valid category'
        },
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative']
    },
    inStock: {
        type: Boolean,
        required: [true, 'Stock status is required']
    },
});
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
/**
 * title (string): The title of the book.
author (string): The author of the book.
price (number): Price of the book.
category (string): The genre or category of the book (e.g., Fiction, Science). use enum, exact value (Fiction, Science, SelfDevelopment, Poetry, Religious)
description (string): A brief description of the book.
quantity (number): Quantity of the book available.
inStock (boolean): Indicates if the book is in stock.
 */ 
