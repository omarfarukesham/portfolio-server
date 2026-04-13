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
exports.EbookOrderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const ebookOrder_validation_1 = require("./ebookOrder.validation");
const ebookOrder_service_1 = require("./ebookOrder.service");
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parsed = ebookOrder_validation_1.ebookOrderSchema.safeParse(req.body);
    if (!parsed.success) {
        const firstError = ((_a = parsed.error.errors[0]) === null || _a === void 0 ? void 0 : _a.message) || 'Validation failed';
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: firstError,
            data: null,
        });
    }
    try {
        const order = yield ebookOrder_service_1.EbookOrderService.createEbookOrder(parsed.data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: 'Order placed successfully. You will receive the eBook via email shortly.',
            data: order,
        });
    }
    catch (err) {
        if (err.message === 'This Transaction ID has already been used') {
            return (0, sendResponse_1.default)(res, {
                statusCode: http_status_codes_1.StatusCodes.CONFLICT,
                message: err.message,
                data: null,
            });
        }
        throw err;
    }
}));
const getAll = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield ebookOrder_service_1.EbookOrderService.getAllEbookOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Orders fetched',
        data: orders,
    });
}));
exports.EbookOrderController = { create, getAll };
