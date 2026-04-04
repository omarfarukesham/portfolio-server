"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EbookModel = void 0;
const mongoose_1 = require("mongoose");
const ebookSchema = new mongoose_1.Schema({
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    outcomes: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number },
    badge: { type: String },
    coverImage: { type: String, required: true },
    pdfPath: { type: String, required: true },
    category: { type: String, default: 'Safety' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.EbookModel = (0, mongoose_1.model)('Ebook', ebookSchema);
