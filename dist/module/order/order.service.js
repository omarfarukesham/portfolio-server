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
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Create a new Order
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.create(payload);
    return result;
});
// const CheckoutOrderIntert = async (payload: Order) => {
//   const result = new OrderModel(payload);
//   const stripeBuyPrices = Number(result?.totalPrice);
//   const amount = Number((stripeBuyPrices  * 100))
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount,
//     payment_method_types: ["card"],
//     currency: "usd",
//   });
//   return {paymentIntent,result};
// };
const CheckoutOrderIntert = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = new order_model_1.OrderModel(payload);
    const stripeBuyPrices = Number(result === null || result === void 0 ? void 0 : result.totalPrice);
    // console.log(payload)
    // Check if totalPrice is valid
    if (isNaN(stripeBuyPrices) || stripeBuyPrices <= 0) {
        throw new Error("Invalid totalPrice value. It must be a valid number greater than zero.");
    }
    const amount = Math.round(stripeBuyPrices * 100);
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: amount,
        payment_method_types: ["card"],
        currency: "usd",
    });
    return { paymentIntent, result };
});
// Get all Orders 
const getAlOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find();
    return result;
});
// Get single Order following by id
const getSingleOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findById({ _id: id });
    return result;
});
// Update a Order by ID
const updateOrderFromDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findByIdAndUpdate(id, data, { new: true });
    return result;
});
// Delete a ORDER by ID
const deleteOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findOneAndDelete({ _id: id });
    return result;
});
const getTotalPriceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" },
            },
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);
    return result.length > 0 ? result[0].totalRevenue : 0;
});
//all service is exported from this function
exports.OrderServices = {
    createOrderIntoDB,
    CheckoutOrderIntert,
    getAlOrdersFromDB,
    getSingleOrderFromDB,
    updateOrderFromDB,
    deleteOrderFromDB,
    getTotalPriceFromDB
};
