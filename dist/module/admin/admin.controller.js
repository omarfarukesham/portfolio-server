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
exports.adminController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
// ── Stats ───────────────────────────────────────────────
const getStats = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.getStats();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Dashboard stats fetched",
        data: result,
    });
}));
// ── Customers ───────────────────────────────────────────
const getAllCustomers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.getAllCustomers(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Customers fetched",
        data: result,
    });
}));
// ── Orders ──────────────────────────────────────────────
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.getAllOrders(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Orders fetched",
        data: result,
    });
}));
const updateOrderStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const result = yield admin_service_1.adminService.updateOrderStatus(id, status);
    if (!result)
        throw new Error("Order not found");
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Order status updated",
        data: result,
    });
}));
// ── Payments ────────────────────────────────────────────
const getAllPayments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.getAllPayments(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Payments fetched",
        data: result,
    });
}));
// ── Ebooks CRUD ─────────────────────────────────────────
const getAllEbooks = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.getAllEbooks();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Ebooks fetched",
        data: result,
    });
}));
const createEbook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.createEbook(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Ebook created",
        data: result,
    });
}));
const updateEbook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.updateEbook(id, req.body);
    if (!result)
        throw new Error("Ebook not found");
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Ebook updated",
        data: result,
    });
}));
const deleteEbook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.deleteEbook(id);
    if (!result)
        throw new Error("Ebook not found");
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Ebook deactivated",
        data: result,
    });
}));
// ── Fire Products CRUD ──────────────────────────────────
const getAllFireProducts = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.getAllFireProducts();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Fire products fetched",
        data: result,
    });
}));
const createFireProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.createFireProduct(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Fire product created",
        data: result,
    });
}));
const updateFireProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.updateFireProduct(id, req.body);
    if (!result)
        throw new Error("Fire product not found");
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Fire product updated",
        data: result,
    });
}));
const deleteFireProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.deleteFireProduct(id);
    if (!result)
        throw new Error("Fire product not found");
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Fire product deactivated",
        data: result,
    });
}));
// ── Send Ebook Email ────────────────────────────────────
const sendEbookEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.sendEbookEmailToCustomer(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Ebook email sent successfully",
        data: result,
    });
}));
// ── Blogs ───────────────────────────────────────────────
const deleteBlogByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.deleteBlog(id);
    if (!result)
        throw new Error("Blog not found");
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Blog deleted",
        data: undefined,
    });
}));
exports.adminController = {
    getStats,
    getAllCustomers,
    getAllOrders,
    updateOrderStatus,
    getAllPayments,
    getAllEbooks,
    createEbook,
    updateEbook,
    deleteEbook,
    getAllFireProducts,
    createFireProduct,
    updateFireProduct,
    deleteFireProduct,
    sendEbookEmail,
    deleteBlogByAdmin,
};
