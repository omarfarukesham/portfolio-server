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
exports.adminService = void 0;
const blog_model_1 = __importDefault(require("../blog/blog.model"));
const ebook_model_1 = require("../ebook/ebook.model");
const fireProduct_model_1 = require("../fire-product/fireProduct.model");
const order_model_1 = require("../shop-order/order.model");
const payment_model_1 = require("../shop-order/payment.model");
const identity_model_1 = require("../identity/identity.model");
const wishlist_model_1 = require("../wishlist/wishlist.model");
const email_1 = require("../../utils/email");
// ── Stats ───────────────────────────────────────────────
const getStats = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const [totalCustomers, totalOrders, totalEbooks, totalFireProducts, revenueAgg] = yield Promise.all([
        identity_model_1.UserIdentityModel.countDocuments(),
        order_model_1.OrderModel.countDocuments(),
        ebook_model_1.EbookModel.countDocuments({ isActive: true }),
        fireProduct_model_1.FireProductModel.countDocuments({ status: "active" }),
        order_model_1.OrderModel.aggregate([
            { $match: { status: "PAID" } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ]),
    ]);
    return {
        totalCustomers,
        totalOrders,
        totalEbooks,
        totalFireProducts,
        totalProducts: totalEbooks + totalFireProducts,
        totalRevenue: ((_a = revenueAgg[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
    };
});
// ── Customers (UserIdentity) ────────────────────────────
const getAllCustomers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;
    const [customers, total] = yield Promise.all([
        identity_model_1.UserIdentityModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        identity_model_1.UserIdentityModel.countDocuments(),
    ]);
    // Enrich each customer with order count and wishlist count
    const enriched = yield Promise.all(customers.map((c) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const [orderCount, wishlistCount, totalSpentAgg] = yield Promise.all([
            order_model_1.OrderModel.countDocuments({ identityId: c._id, status: "PAID" }),
            wishlist_model_1.WishlistItemModel.countDocuments({ identityId: c._id }),
            order_model_1.OrderModel.aggregate([
                { $match: { identityId: c._id, status: "PAID" } },
                { $group: { _id: null, total: { $sum: "$totalPrice" } } },
            ]),
        ]);
        return Object.assign(Object.assign({}, c), { orderCount,
            wishlistCount, totalSpent: ((_a = totalSpentAgg[0]) === null || _a === void 0 ? void 0 : _a.total) || 0 });
    })));
    return { customers: enriched, total, page, limit };
});
// ── Orders ──────────────────────────────────────────────
const getAllOrders = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;
    const filter = {};
    if (query.status)
        filter.status = query.status;
    const [orders, total] = yield Promise.all([
        order_model_1.OrderModel.find(filter)
            .populate("identityId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        order_model_1.OrderModel.countDocuments(filter),
    ]);
    return { orders, total, page, limit };
});
const updateOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    return order;
});
// ── Payments ────────────────────────────────────────────
const getAllPayments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;
    const [payments, total] = yield Promise.all([
        payment_model_1.PaymentModel.find()
            .populate("orderId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        payment_model_1.PaymentModel.countDocuments(),
    ]);
    return { payments, total, page, limit };
});
// ── Ebooks CRUD ─────────────────────────────────────────
const getAllEbooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return ebook_model_1.EbookModel.find().sort({ createdAt: -1 });
});
const createEbook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return ebook_model_1.EbookModel.create(data);
});
const updateEbook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return ebook_model_1.EbookModel.findByIdAndUpdate(id, data, { new: true });
});
const deleteEbook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return ebook_model_1.EbookModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
});
// ── Fire Products CRUD ──────────────────────────────────
const getAllFireProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return fireProduct_model_1.FireProductModel.find().sort({ createdAt: -1 });
});
const createFireProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return fireProduct_model_1.FireProductModel.create(data);
});
const updateFireProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return fireProduct_model_1.FireProductModel.findByIdAndUpdate(id, data, { new: true });
});
const deleteFireProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return fireProduct_model_1.FireProductModel.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
});
// ── Send Ebook Email ────────────────────────────────────
const DEFAULT_EBOOK_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1aOZoPPkJt1TD9PeCQhry5XRNklPPKuTy";
const sendEbookEmailToCustomer = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const order = yield order_model_1.OrderModel.findById(orderId).populate("identityId");
    if (!order)
        throw new Error("Order not found");
    if (order.status !== "PAID")
        throw new Error("Order is not paid yet");
    if (order.emailSent)
        throw new Error("Email has already been sent for this order");
    const identity = order.identityId;
    if (!(identity === null || identity === void 0 ? void 0 : identity.email))
        throw new Error("Customer email not found");
    const ebookItem = order.items.find((item) => item.itemType === "ebook");
    if (!ebookItem)
        throw new Error("No ebook found in this order");
    const ebook = yield ebook_model_1.EbookModel.findOne({ title: ebookItem.title });
    const isValidUrl = (_a = ebook === null || ebook === void 0 ? void 0 : ebook.pdfPath) === null || _a === void 0 ? void 0 : _a.startsWith("http");
    const downloadUrl = isValidUrl ? ebook.pdfPath : DEFAULT_EBOOK_DOWNLOAD_URL;
    yield (0, email_1.sendEbookEmail)({
        to: identity.email,
        customerName: identity.email.split("@")[0],
        ebookTitle: ebookItem.title,
        downloadUrl,
    });
    order.emailSent = true;
    yield order.save();
    return order;
});
// ── Blogs ───────────────────────────────────────────────
const deleteBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findByIdAndDelete(blogId);
    return result;
});
exports.adminService = {
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
    sendEbookEmailToCustomer,
    deleteBlog,
};
