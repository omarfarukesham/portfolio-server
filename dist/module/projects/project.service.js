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
exports.projectService = void 0;
const project_model_1 = __importDefault(require("./project.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.default.create(payload);
    return result;
});
const getProjects = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['title', 'description', 'technologies'];
    const projects = new querybuilder_1.default(project_model_1.default.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .select();
    const result = yield projects.modelQuery;
    return result;
});
const getSingleProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.default.findById(id);
    return result;
});
const updateProject = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.default.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.projectService = {
    createProject,
    getProjects,
    getSingleProject,
    updateProject,
    deleteProject,
};
