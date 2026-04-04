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
exports.EbookService = void 0;
const ebook_model_1 = require("./ebook.model");
const getAllEbooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return ebook_model_1.EbookModel.find({ isActive: true }).sort({ createdAt: -1 });
});
const getEbookBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return ebook_model_1.EbookModel.findOne({ slug, isActive: true });
});
const createEbook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return ebook_model_1.EbookModel.create(data);
});
const updateEbook = (slug, data) => __awaiter(void 0, void 0, void 0, function* () {
    return ebook_model_1.EbookModel.findOneAndUpdate({ slug }, data, { new: true, runValidators: true });
});
const deleteEbook = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return ebook_model_1.EbookModel.findOneAndUpdate({ slug }, { isActive: false }, { new: true });
});
exports.EbookService = { getAllEbooks, getEbookBySlug, createEbook, updateEbook, deleteEbook };
