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
exports.IdentityService = void 0;
const identity_model_1 = require("./identity.model");
const findOrCreate = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const email = (_a = identifier.email) === null || _a === void 0 ? void 0 : _a.toLowerCase().trim();
    const phone = (_b = identifier.phone) === null || _b === void 0 ? void 0 : _b.trim();
    if (!email && !phone) {
        throw new Error('Email or phone is required');
    }
    // Build $or query to find by either email or phone
    const orConditions = [];
    if (email)
        orConditions.push({ email });
    if (phone)
        orConditions.push({ phone });
    let identity = yield identity_model_1.UserIdentityModel.findOne({ $or: orConditions });
    if (!identity) {
        // Create new identity
        const data = {};
        if (email)
            data.email = email;
        if (phone)
            data.phone = phone;
        identity = yield identity_model_1.UserIdentityModel.create(data);
    }
    else {
        // Update existing identity if new fields are provided
        let needsUpdate = false;
        if (email && !identity.email) {
            identity.email = email;
            needsUpdate = true;
        }
        if (phone && !identity.phone) {
            identity.phone = phone;
            needsUpdate = true;
        }
        if (needsUpdate)
            yield identity.save();
    }
    return identity;
});
const findByIdentifier = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    return identity_model_1.UserIdentityModel.findOne({
        $or: [
            { email: identifier.toLowerCase().trim() },
            { phone: identifier.trim() },
        ],
    });
});
exports.IdentityService = { findOrCreate, findByIdentifier };
