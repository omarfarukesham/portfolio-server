"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    orderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ShopOrder', required: true },
    tranId: { type: String, required: true },
    valId: { type: String },
    status: { type: String, required: true, default: 'PENDING' },
    amount: { type: Number, required: true },
    cardType: { type: String },
    bankTranId: { type: String },
    gatewayResponse: { type: mongoose_1.Schema.Types.Mixed },
}, { timestamps: true });
exports.PaymentModel = (0, mongoose_1.model)('Payment', paymentSchema);
