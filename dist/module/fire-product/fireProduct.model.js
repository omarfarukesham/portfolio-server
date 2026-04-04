"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireProductModel = void 0;
const mongoose_1 = require("mongoose");
const fireProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number },
    category: {
        type: String,
        enum: ['extinguisher', 'alarm', 'first-aid', 'safety-sign', 'other'],
        required: true,
    },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, { timestamps: true });
exports.FireProductModel = (0, mongoose_1.model)('FireProduct', fireProductSchema);
