import express from "express";
import { createPaymentIntent } from "./Checkout.controller";
// import { createPaymentIntent } from "./checkout.controller";

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);

export const CheckoutRoutes = router;
