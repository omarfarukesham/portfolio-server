"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillRoutes = void 0;
const express_1 = __importDefault(require("express"));
const skill_controller_1 = require("./skill.controller");
const router = express_1.default.Router();
router.post("/", skill_controller_1.skillController.createSkill);
router.get("/", skill_controller_1.skillController.getSkills);
router.get("/:id", skill_controller_1.skillController.getSingleSkill);
router.patch("/:id", skill_controller_1.skillController.updateSkill);
router.delete("/:id", skill_controller_1.skillController.deleteSkill);
exports.skillRoutes = router;
