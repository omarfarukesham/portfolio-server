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
exports.DownloadController = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const order_model_1 = require("../shop-order/order.model");
const ebook_model_1 = require("../ebook/ebook.model");
const mongoose_1 = require("mongoose");
const downloadPdf = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, ebookId } = req.params;
    // 1. Verify order is PAID and contains this ebook
    const order = yield order_model_1.OrderModel.findOne({
        _id: new mongoose_1.Types.ObjectId(orderId),
        status: 'PAID',
        'items.ebookId': new mongoose_1.Types.ObjectId(ebookId),
    });
    if (!order) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
            status: false,
            message: 'No paid order found for this ebook',
        });
        return;
    }
    // 2. Get ebook PDF path
    const ebook = yield ebook_model_1.EbookModel.findById(ebookId);
    if (!ebook || !ebook.pdfPath) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            status: false,
            message: 'PDF not found',
        });
        return;
    }
    // 3. Resolve and send file
    const pdfFullPath = path_1.default.resolve(ebook.pdfPath);
    if (!fs_1.default.existsSync(pdfFullPath)) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            status: false,
            message: 'PDF file not found on server',
        });
        return;
    }
    const filename = `${ebook.slug}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    fs_1.default.createReadStream(pdfFullPath).pipe(res);
}));
exports.DownloadController = { downloadPdf };
