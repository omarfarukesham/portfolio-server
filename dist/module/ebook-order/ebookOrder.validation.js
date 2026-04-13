"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ebookOrderSchema = void 0;
const zod_1 = require("zod");
// BD phone: exactly 11 digits starting with 01 (e.g. 01775070627)
const bdPhoneRegex = /^01[3-9]\d{8}$/;
// bKash/Nagad transaction IDs: alphanumeric, typically 8-10 chars uppercase
const transactionIdRegex = /^[A-Z0-9]{8,10}$/i;
exports.ebookOrderSchema = zod_1.z.object({
    phone: zod_1.z
        .string({ required_error: 'Phone number is required' })
        .trim()
        .refine((v) => bdPhoneRegex.test(v.replace(/\s|-/g, '')), {
        message: 'Enter a valid 11-digit BD mobile number (e.g. 01775070627)',
    }),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .trim()
        .email('Enter a valid email address'),
    transactionId: zod_1.z
        .string({ required_error: 'Transaction ID is required' })
        .trim()
        .refine((v) => transactionIdRegex.test(v), {
        message: 'Enter a valid bKash/Nagad Transaction ID (e.g. DD30QIBR9E)',
    }),
    paymentMethod: zod_1.z.enum(['bkash', 'nagad'], {
        required_error: 'Payment method is required',
    }),
});
