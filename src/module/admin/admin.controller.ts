import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminService } from "./admin.service";

// ── Stats ───────────────────────────────────────────────
const getStats = catchAsync(async (_req, res) => {
  const result = await adminService.getStats();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Dashboard stats fetched",
    data: result,
  });
});

// ── Customers ───────────────────────────────────────────
const getAllCustomers = catchAsync(async (req, res) => {
  const result = await adminService.getAllCustomers(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Customers fetched",
    data: result,
  });
});

// ── Orders ──────────────────────────────────────────────
const getAllOrders = catchAsync(async (req, res) => {
  const result = await adminService.getAllOrders(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Orders fetched",
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await adminService.updateOrderStatus(id, status);
  if (!result) throw new Error("Order not found");
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Order status updated",
    data: result,
  });
});

// ── Payments ────────────────────────────────────────────
const getAllPayments = catchAsync(async (req, res) => {
  const result = await adminService.getAllPayments(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Payments fetched",
    data: result,
  });
});

// ── Ebooks CRUD ─────────────────────────────────────────
const getAllEbooks = catchAsync(async (_req, res) => {
  const result = await adminService.getAllEbooks();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Ebooks fetched",
    data: result,
  });
});

const createEbook = catchAsync(async (req, res) => {
  const result = await adminService.createEbook(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Ebook created",
    data: result,
  });
});

const updateEbook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.updateEbook(id, req.body);
  if (!result) throw new Error("Ebook not found");
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Ebook updated",
    data: result,
  });
});

const deleteEbook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.deleteEbook(id);
  if (!result) throw new Error("Ebook not found");
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Ebook deactivated",
    data: result,
  });
});

// ── Fire Products CRUD ──────────────────────────────────
const getAllFireProducts = catchAsync(async (_req, res) => {
  const result = await adminService.getAllFireProducts();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Fire products fetched",
    data: result,
  });
});

const createFireProduct = catchAsync(async (req, res) => {
  const result = await adminService.createFireProduct(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Fire product created",
    data: result,
  });
});

const updateFireProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.updateFireProduct(id, req.body);
  if (!result) throw new Error("Fire product not found");
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Fire product updated",
    data: result,
  });
});

const deleteFireProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.deleteFireProduct(id);
  if (!result) throw new Error("Fire product not found");
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Fire product deactivated",
    data: result,
  });
});

// ── Blogs ───────────────────────────────────────────────
const deleteBlogByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.deleteBlog(id);
  if (!result) throw new Error("Blog not found");
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Blog deleted",
    data: undefined,
  });
});

export const adminController = {
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
  deleteBlogByAdmin,
};
