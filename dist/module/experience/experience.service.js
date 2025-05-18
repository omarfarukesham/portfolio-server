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
exports.experienceService = void 0;
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const experience_model_1 = __importDefault(require("./experience.model"));
// Create new experience entry
const createExperience = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Payload in service", payload);
    const result = yield experience_model_1.default.create(payload);
    return result;
});
// Get all experiences with search, filter, pagination
const getExperiences = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ["company", "role", "description", "technologies"];
    const experiences = new querybuilder_1.default(experience_model_1.default.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .select();
    const result = yield experiences.modelQuery;
    return result;
});
// Get single experience by ID
const getSingleExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_model_1.default.findById(id);
    return result;
});
// Update experience
const updateExperience = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_model_1.default.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
// Delete experience
const deleteExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.experienceService = {
    createExperience,
    getExperiences,
    getSingleExperience,
    updateExperience,
    deleteExperience,
};
