"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistItemModel = void 0;
const mongoose_1 = require("mongoose");
const wishlistItemSchema = new mongoose_1.Schema({
    identityId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'UserIdentity', required: true },
    ebookId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Ebook', required: true },
}, { timestamps: true });
wishlistItemSchema.index({ identityId: 1, ebookId: 1 }, { unique: true });
exports.WishlistItemModel = (0, mongoose_1.model)('WishlistItem', wishlistItemSchema);
