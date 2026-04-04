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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const SSLCommerzPayment = require('sslcommerz-lts');
const config_1 = __importDefault(require("../../config"));
const identity_service_1 = require("../identity/identity.service");
const ebook_model_1 = require("../ebook/ebook.model");
const order_model_1 = require("../shop-order/order.model");
const payment_model_1 = require("../shop-order/payment.model");
const mongoose_1 = require("mongoose");
function generateTranId() {
    return `LS_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}
const initPayment = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, items, customerName } = input;
    if (!email && !phone)
        throw new Error('Email or phone is required');
    if (!items || items.length === 0)
        throw new Error('At least one item is required');
    // 1. Resolve identity
    const identity = yield identity_service_1.IdentityService.findOrCreate({ email, phone });
    // 2. Fetch ebook details — accept both ObjectId and slug
    const isObjectId = (s) => /^[a-f\d]{24}$/i.test(s);
    const slugs = items.filter((i) => !isObjectId(i.ebookId)).map((i) => i.ebookId);
    const ids = items.filter((i) => isObjectId(i.ebookId)).map((i) => new mongoose_1.Types.ObjectId(i.ebookId));
    const ebooks = yield ebook_model_1.EbookModel.find({
        isActive: true,
        $or: [
            ...(ids.length ? [{ _id: { $in: ids } }] : []),
            ...(slugs.length ? [{ slug: { $in: slugs } }] : []),
        ],
    });
    if (ebooks.length === 0)
        throw new Error('No valid ebooks found');
    const orderItems = ebooks.map((ebook) => ({
        ebookId: ebook._id,
        title: ebook.title,
        price: ebook.price,
    }));
    const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0);
    const tranId = generateTranId();
    // 3. Create order (PENDING)
    const order = yield order_model_1.OrderModel.create({
        identityId: identity._id,
        items: orderItems,
        totalPrice,
        status: 'PENDING',
        tranId,
    });
    // 4. Create payment record (PENDING)
    yield payment_model_1.PaymentModel.create({
        orderId: order._id,
        tranId,
        status: 'PENDING',
        amount: totalPrice,
    });
    // 5. Init SSLCOMMERZ
    const sslcz = new SSLCommerzPayment(config_1.default.ssl.store_id, config_1.default.ssl.store_passwd, config_1.default.ssl.is_live);
    const productNames = ebooks.map((e) => e.title).join(', ');
    const sslData = {
        total_amount: totalPrice,
        currency: 'BDT',
        tran_id: tranId,
        success_url: `${config_1.default.backend_url}/api/shop-checkout/success`,
        fail_url: `${config_1.default.backend_url}/api/shop-checkout/fail`,
        cancel_url: `${config_1.default.backend_url}/api/shop-checkout/cancel`,
        ipn_url: `${config_1.default.backend_url}/api/shop-checkout/ipn`,
        shipping_method: 'NO',
        product_name: productNames,
        product_category: 'eBook',
        product_profile: 'non-physical-goods',
        cus_name: customerName || 'Customer',
        cus_email: email || 'no-email@learnsafety.pro',
        cus_phone: phone || '01700000000',
        cus_add1: 'Dhaka',
        cus_city: 'Dhaka',
        cus_country: 'Bangladesh',
        value_a: order._id.toString(),
        value_b: identity._id.toString(),
    };
    const apiResponse = yield sslcz.init(sslData);
    console.log('SSLCOMMERZ init response:', JSON.stringify(apiResponse, null, 2));
    if (!(apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.GatewayPageURL)) {
        // Mark order as failed if gateway init fails
        yield order_model_1.OrderModel.findByIdAndUpdate(order._id, { status: 'FAILED' });
        yield payment_model_1.PaymentModel.findOneAndUpdate({ tranId }, { status: 'FAILED' });
        throw new Error(`Payment gateway initialization failed: ${(apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.failedreason) || (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) || 'Unknown error'}`);
    }
    return {
        gatewayUrl: apiResponse.GatewayPageURL,
        tranId,
        orderId: order._id,
    };
});
const handleSuccess = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tran_id, val_id, card_type, bank_tran_id } = payload;
    if (!tran_id)
        throw new Error('Transaction ID missing');
    // Idempotent: skip if already PAID
    const order = yield order_model_1.OrderModel.findOne({ tranId: tran_id });
    if (!order)
        throw new Error('Order not found');
    if (order.status === 'PAID')
        return order;
    // Validate with SSLCOMMERZ
    const sslcz = new SSLCommerzPayment(config_1.default.ssl.store_id, config_1.default.ssl.store_passwd, config_1.default.ssl.is_live);
    const validationResponse = yield sslcz.validate({ val_id });
    if (validationResponse.status === 'VALID' || validationResponse.status === 'VALIDATED') {
        order.status = 'PAID';
        yield order.save();
        yield payment_model_1.PaymentModel.findOneAndUpdate({ tranId: tran_id }, {
            status: 'PAID',
            valId: val_id,
            cardType: card_type,
            bankTranId: bank_tran_id,
            gatewayResponse: payload,
        });
    }
    else {
        order.status = 'FAILED';
        yield order.save();
        yield payment_model_1.PaymentModel.findOneAndUpdate({ tranId: tran_id }, { status: 'FAILED', gatewayResponse: payload });
    }
    return order;
});
const handleFail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tran_id } = payload;
    if (!tran_id)
        return;
    const order = yield order_model_1.OrderModel.findOne({ tranId: tran_id });
    if (!order || order.status === 'PAID')
        return order;
    order.status = 'FAILED';
    yield order.save();
    yield payment_model_1.PaymentModel.findOneAndUpdate({ tranId: tran_id }, { status: 'FAILED', gatewayResponse: payload });
    return order;
});
const handleCancel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tran_id } = payload;
    if (!tran_id)
        return;
    const order = yield order_model_1.OrderModel.findOne({ tranId: tran_id });
    if (!order || order.status === 'PAID')
        return order;
    order.status = 'CANCELLED';
    yield order.save();
    yield payment_model_1.PaymentModel.findOneAndUpdate({ tranId: tran_id }, { status: 'CANCELLED', gatewayResponse: payload });
    return order;
});
exports.CheckoutService = { initPayment, handleSuccess, handleFail, handleCancel };
