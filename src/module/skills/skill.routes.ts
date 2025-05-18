import express from "express";
import { skillController } from "./skill.controller";

const router = express.Router();

router.post("/", skillController.createSkill);
router.get("/", skillController.getSkills);
router.get("/:id", skillController.getSingleSkill);
router.patch("/:id", skillController.updateSkill);
router.delete("/:id", skillController.deleteSkill);

export const skillRoutes = router;
