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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
exports.OrderControllers = {
    // boiOrder: async (req: Request, res: Response, next: NextFunction) => {
    //   try  {
    //     const { email, product, quantity, totalPrice, paymentMethodId } = req.body;
    //     if(!email || !product || !quantity || !totalPrice || !paymentMethodId) {
    //       res.status(400).json({
    //         success: false,
    //         message: "Missing required fields"
    //       })
    //     }
    //     const paymentIntent = await stripe.paymentIntents.create({
    //       amount: Math.round(totalPrice * 100),
    //       currency: "usd",
    //       payment_method: paymentMethodId,
    //       confirmation_method: "manual",
    //       confirm: true,
    //     });
    //     const orderPayload: Order = {
    //       id: paymentIntent.id,
    //       email,
    //       products,
    //       quantity,
    //       totalPrice,
    //       paymentStatus: "pending",
    //       paymentIntentId: paymentIntent.id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     };
    //     const order = await OrderServices.createOrderIntoDB(orderPayload);
    //     res.status(201).json({
    //       success: true,
    //       message: "Order created successfully",
    //       data: order,
    //     });
    //   }catch (err) {
    //     next(err);
    //   }
    // },
    checkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            console.log(payload);
            const result = yield order_service_1.OrderServices.CheckoutOrderIntert(payload);
            res.status(200).json({
                success: true,
                message: 'Order created successfully',
                data: result,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Failed to create Order',
            });
        }
    }),
    getAllOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield order_service_1.OrderServices.getAlOrdersFromDB();
            res.status(200).json({
                success: true,
                message: 'Order retrieved successfully',
                data: result,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve Order',
            });
        }
    }),
    getSingleOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { orderId } = req.params;
            const result = yield order_service_1.OrderServices.getSingleOrderFromDB(orderId);
            res.status(200).json({
                success: true,
                message: 'Order retrieved successfully',
                data: result,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve order',
            });
        }
    }),
    updateOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orderId = req.params.orderId;
            const data = req.body;
            const result = yield order_service_1.OrderServices.updateOrderFromDB(orderId, data);
            if (!result) {
                res.status(404).json({
                    success: false,
                    message: 'Order not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Order updated successfully',
                data: result,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Failed to update Order',
            });
        }
    }),
    deleteOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { orderId } = req.params;
            const result = yield order_service_1.OrderServices.deleteOrderFromDB(orderId);
            if (!result) {
                res.status(404).json({
                    success: false,
                    message: 'Order not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Order deleted successfully',
                data: result,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Failed to delete Order',
            });
        }
    }),
    getTotalOrderRevenue: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield order_service_1.OrderServices.getTotalPriceFromDB();
            res.status(200).json({
                success: true,
                message: 'Revenue calculated successfully',
                data: { totalRevenue: result },
            });
        }
        catch (err) {
            console.error('Error calculating total revenue:', err);
            res.status(500).json({
                success: false,
                message: 'Failed to calculate revenue. Please try again later.',
            });
        }
    })
};
// export const OrderControllers = {
//     // createOrder1,
//     // createOrder,
//     getAllOrder,
//     getSingleOrder,
//     updateOrder,
//     deleteOrder,
//     getTotalOrderRevenue
// };
