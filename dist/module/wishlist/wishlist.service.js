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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const mongoose_1 = require("mongoose");
const wishlist_model_1 = require("./wishlist.model");
const ebook_model_1 = require("../ebook/ebook.model");
const isObjectId = (s) => /^[a-f\d]{24}$/i.test(s);
const resolveEbookId = (ebookIdOrSlug) => __awaiter(void 0, void 0, void 0, function* () {
    if (isObjectId(ebookIdOrSlug))
        return new mongoose_1.Types.ObjectId(ebookIdOrSlug);
    const ebook = yield ebook_model_1.EbookModel.findOne({ slug: ebookIdOrSlug });
    if (!ebook)
        throw new Error('Ebook not found');
    return ebook._id;
});
const addItem = (identityId, ebookIdOrSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const ebookId = yield resolveEbookId(ebookIdOrSlug);
    const existing = yield wishlist_model_1.WishlistItemModel.findOne({
        identityId: new mongoose_1.Types.ObjectId(identityId),
        ebookId,
    });
    if (existing)
        return existing;
    return wishlist_model_1.WishlistItemModel.create({
        identityId: new mongoose_1.Types.ObjectId(identityId),
        ebookId,
    });
});
const removeItem = (identityId, ebookId) => __awaiter(void 0, void 0, void 0, function* () {
    return wishlist_model_1.WishlistItemModel.findOneAndDelete({
        identityId: new mongoose_1.Types.ObjectId(identityId),
        ebookId: new mongoose_1.Types.ObjectId(ebookId),
    });
});
const getByIdentity = (identityId) => __awaiter(void 0, void 0, void 0, function* () {
    return wishlist_model_1.WishlistItemModel.find({
        identityId: new mongoose_1.Types.ObjectId(identityId),
    }).populate('ebookId');
});
exports.WishlistService = { addItem, removeItem, getByIdentity };
