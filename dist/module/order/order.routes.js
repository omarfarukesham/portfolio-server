"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// Create new order
// router.post('/', OrderControllers.boiOrder);
//Post checkout route
router.post('/checkout', order_controller_1.OrderControllers.checkout);
// Get all orders
router.get('/', order_controller_1.OrderControllers.getAllOrder);
// Get total revenue
router.get('/revenue', order_controller_1.OrderControllers.getTotalOrderRevenue);
// Get single order
router.get('/:orderId', order_controller_1.OrderControllers.getSingleOrder);
// Update order
router.patch('/:orderId', order_controller_1.OrderControllers.updateOrder);
// Delete order
router.delete('/:orderId', order_controller_1.OrderControllers.deleteOrder);
exports.OrderRoutes = router;
