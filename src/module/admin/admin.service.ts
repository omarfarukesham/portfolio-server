import Blog from "../blog/blog.model";
import { EbookModel } from "../ebook/ebook.model";
import { FireProductModel } from "../fire-product/fireProduct.model";
import { OrderModel } from "../shop-order/order.model";
import { PaymentModel } from "../shop-order/payment.model";
import { UserIdentityModel } from "../identity/identity.model";
import { WishlistItemModel } from "../wishlist/wishlist.model";
import { sendEbookEmail } from "../../utils/email";

// ── Stats ───────────────────────────────────────────────
const getStats = async () => {
  const [totalCustomers, totalOrders, totalEbooks, totalFireProducts, revenueAgg] =
    await Promise.all([
      UserIdentityModel.countDocuments(),
      OrderModel.countDocuments(),
      EbookModel.countDocuments({ isActive: true }),
      FireProductModel.countDocuments({ status: "active" }),
      OrderModel.aggregate([
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
    totalRevenue: revenueAgg[0]?.total || 0,
  };
};

// ── Customers (UserIdentity) ────────────────────────────
const getAllCustomers = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const [customers, total] = await Promise.all([
    UserIdentityModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    UserIdentityModel.countDocuments(),
  ]);

  // Enrich each customer with order count and wishlist count
  const enriched = await Promise.all(
    customers.map(async (c) => {
      const [orderCount, wishlistCount, totalSpentAgg] = await Promise.all([
        OrderModel.countDocuments({ identityId: c._id, status: "PAID" }),
        WishlistItemModel.countDocuments({ identityId: c._id }),
        OrderModel.aggregate([
          { $match: { identityId: c._id, status: "PAID" } },
          { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ]),
      ]);
      return {
        ...c,
        orderCount,
        wishlistCount,
        totalSpent: totalSpentAgg[0]?.total || 0,
      };
    })
  );

  return { customers: enriched, total, page, limit };
};

// ── Orders ──────────────────────────────────────────────
const getAllOrders = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};
  if (query.status) filter.status = query.status;

  const [orders, total] = await Promise.all([
    OrderModel.find(filter)
      .populate("identityId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    OrderModel.countDocuments(filter),
  ]);

  return { orders, total, page, limit };
};

const updateOrderStatus = async (orderId: string, status: string) => {
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  return order;
};

// ── Payments ────────────────────────────────────────────
const getAllPayments = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const [payments, total] = await Promise.all([
    PaymentModel.find()
      .populate("orderId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    PaymentModel.countDocuments(),
  ]);

  return { payments, total, page, limit };
};

// ── Ebooks CRUD ─────────────────────────────────────────
const getAllEbooks = async () => {
  return EbookModel.find().sort({ createdAt: -1 });
};

const createEbook = async (data: Record<string, unknown>) => {
  return EbookModel.create(data);
};

const updateEbook = async (id: string, data: Record<string, unknown>) => {
  return EbookModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteEbook = async (id: string) => {
  return EbookModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

// ── Fire Products CRUD ──────────────────────────────────
const getAllFireProducts = async () => {
  return FireProductModel.find().sort({ createdAt: -1 });
};

const createFireProduct = async (data: Record<string, unknown>) => {
  return FireProductModel.create(data);
};

const updateFireProduct = async (id: string, data: Record<string, unknown>) => {
  return FireProductModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteFireProduct = async (id: string) => {
  return FireProductModel.findByIdAndUpdate(
    id,
    { status: "inactive" },
    { new: true }
  );
};

// ── Send Ebook Email ────────────────────────────────────
const DEFAULT_EBOOK_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1aOZoPPkJt1TD9PeCQhry5XRNklPPKuTy";

const sendEbookEmailToCustomer = async (orderId: string) => {
  const order = await OrderModel.findById(orderId).populate("identityId");
  if (!order) throw new Error("Order not found");
  if (order.status !== "PAID") throw new Error("Order is not paid yet");
  if (order.emailSent) throw new Error("Email has already been sent for this order");

  const identity = order.identityId as any;
  if (!identity?.email) throw new Error("Customer email not found");

  const ebookItem = order.items.find((item) => item.itemType === "ebook");
  if (!ebookItem) throw new Error("No ebook found in this order");

  const ebook = await EbookModel.findOne({ title: ebookItem.title });
  const downloadUrl = ebook?.pdfPath || DEFAULT_EBOOK_DOWNLOAD_URL;

  await sendEbookEmail({
    to: identity.email,
    customerName: identity.email.split("@")[0],
    ebookTitle: ebookItem.title,
    downloadUrl,
  });

  order.emailSent = true;
  await order.save();

  return order;
};

// ── Blogs ───────────────────────────────────────────────
const deleteBlog = async (blogId: string) => {
  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};

export const adminService = {
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
