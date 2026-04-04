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
exports.CheckoutController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const checkout_service_1 = require("./checkout.service");
const config_1 = __importDefault(require("../../config"));
const init = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, items, customerName } = req.body;
    const result = yield checkout_service_1.CheckoutService.initPayment({ email, phone, items, customerName });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Payment initiated',
        data: result,
    });
}));
// SSLCOMMERZ POSTs to these endpoints, then we redirect the user
const success = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const order = yield checkout_service_1.CheckoutService.handleSuccess(req.body);
    const identityId = ((_a = order === null || order === void 0 ? void 0 : order.identityId) === null || _a === void 0 ? void 0 : _a.toString()) || '';
    res.redirect(`${config_1.default.frontend_url}/dashboard?identity=${identityId}`);
}));
const fail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkout_service_1.CheckoutService.handleFail(req.body);
    res.redirect(`${config_1.default.frontend_url}/dashboard?payment=failed`);
}));
const cancel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkout_service_1.CheckoutService.handleCancel(req.body);
    res.redirect(`${config_1.default.frontend_url}/dashboard?payment=cancelled`);
}));
// IPN is server-to-server, no redirect
const ipn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkout_service_1.CheckoutService.handleSuccess(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'IPN received',
        data: null,
    });
}));
exports.CheckoutController = { init, success, fail, cancel, ipn };
