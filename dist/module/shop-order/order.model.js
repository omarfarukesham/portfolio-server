"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderItemSchema = new mongoose_1.Schema({
    ebookId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Ebook' },
    fireProductId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'FireProduct' },
    itemType: { type: String, enum: ['ebook', 'fire-product'], default: 'ebook' },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    identityId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'UserIdentity', required: true },
    items: { type: [orderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'PAID', 'FAILED', 'CANCELLED'],
        default: 'PENDING',
    },
    tranId: { type: String, required: true, unique: true },
}, { timestamps: true });
exports.OrderModel = (0, mongoose_1.model)('ShopOrder', orderSchema);
