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
exports.skillService = void 0;
const skill_model_1 = __importDefault(require("./skill.model"));
const createSkill = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_model_1.default.create(data);
    return skill;
});
const getSkills = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield skill_model_1.default.find();
});
const getSingleSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield skill_model_1.default.findById(id);
});
const updateSkill = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield skill_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
const deleteSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield skill_model_1.default.findByIdAndDelete(id);
});
exports.skillService = {
    createSkill,
    getSkills,
    getSingleSkill,
    updateSkill,
    deleteSkill,
};
