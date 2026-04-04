"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdentityModel = void 0;
const mongoose_1 = require("mongoose");
const userIdentitySchema = new mongoose_1.Schema({
    email: {
        type: String,
        sparse: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        sparse: true,
        unique: true,
        trim: true,
    },
}, { timestamps: true });
exports.UserIdentityModel = (0, mongoose_1.model)('UserIdentity', userIdentitySchema);
