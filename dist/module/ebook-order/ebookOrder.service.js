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
exports.EbookOrderService = void 0;
const identity_service_1 = require("../identity/identity.service");
const order_model_1 = require("../shop-order/order.model");
const EBOOK_TITLE = 'আগুনের বেসিক নলেজ (Fire Safety Basics)';
const EBOOK_PRICE = 199;
const createEbookOrder = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Find or create user identity
    const identity = yield identity_service_1.IdentityService.findOrCreate({
        email: input.email,
        phone: input.phone.replace(/\s|-/g, ''),
    });
    // 2. Check for duplicate transaction ID
    const existing = yield order_model_1.OrderModel.findOne({ tranId: input.transactionId });
    if (existing) {
        throw new Error('This Transaction ID has already been used');
    }
    // 3. Create order as PENDING (admin will verify and mark PAID)
    const order = yield order_model_1.OrderModel.create({
        identityId: identity._id,
        items: [
            {
                itemType: 'ebook',
                title: EBOOK_TITLE,
                price: EBOOK_PRICE,
                quantity: 1,
            },
        ],
        totalPrice: EBOOK_PRICE,
        status: 'PENDING',
        tranId: input.transactionId,
    });
    return order;
});
const getAllEbookOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.OrderModel.find()
        .populate('identityId')
        .sort({ createdAt: -1 });
});
exports.EbookOrderService = { createEbookOrder, getAllEbookOrders };
