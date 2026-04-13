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
exports.DashboardService = void 0;
const identity_service_1 = require("../identity/identity.service");
const order_model_1 = require("../shop-order/order.model");
const wishlist_model_1 = require("../wishlist/wishlist.model");
const getDashboard = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const identity = yield identity_service_1.IdentityService.findByIdentifier(identifier);
    if (!identity) {
        return { identity: null, purchases: [], wishlist: [] };
    }
    const [purchases, wishlist] = yield Promise.all([
        order_model_1.OrderModel.find({ identityId: identity._id, status: { $in: ['PAID', 'PENDING'] } })
            .populate('items.ebookId')
            .sort({ createdAt: -1 }),
        wishlist_model_1.WishlistItemModel.find({ identityId: identity._id }).populate('ebookId'),
    ]);
    return { identity, purchases, wishlist };
});
const getDashboardById = (identityId) => __awaiter(void 0, void 0, void 0, function* () {
    const [purchases, wishlist] = yield Promise.all([
        order_model_1.OrderModel.find({ identityId, status: { $in: ['PAID', 'PENDING'] } })
            .populate('items.ebookId')
            .sort({ createdAt: -1 }),
        wishlist_model_1.WishlistItemModel.find({ identityId }).populate('ebookId'),
    ]);
    return { purchases, wishlist };
});
exports.DashboardService = { getDashboard, getDashboardById };
