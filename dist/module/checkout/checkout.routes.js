"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Checkout_controller_1 = require("./Checkout.controller");
// import { createPaymentIntent } from "./checkout.controller";
const router = express_1.default.Router();
router.post("/create-payment-intent", Checkout_controller_1.createPaymentIntent);
exports.CheckoutRoutes = router;
