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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const handleCustomError_1 = require("../../helpers/handleCustomError");
const user_model_1 = __importDefault(require("../user/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(payload);
    if (!result) {
        throw new handleCustomError_1.CustomError('Failed to create user', 500);
    }
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }).select('+password');
    if (!user) {
        throw new handleCustomError_1.CustomError('This user is not found!', 404, { field: 'email' });
    }
    if (user.isBlocked) {
        throw new handleCustomError_1.CustomError('This user is blocked!', 403);
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatched) {
        throw new handleCustomError_1.CustomError('Invalid credentials', 401, { field: 'password' });
    }
    const jwtPayload = { email: user.email, role: user.role, id: user._id.toString() };
    // console.log("auth id setup ... ",jwtPayload)
    const token = jsonwebtoken_1.default.sign(jwtPayload, "primarytestkey", { expiresIn: '10d' });
    return { token, user };
});
exports.AuthService = {
    register,
    login,
};
