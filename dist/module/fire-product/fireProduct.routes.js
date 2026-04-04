"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireProductRoutes = void 0;
const express_1 = require("express");
const fireProduct_controller_1 = require("./fireProduct.controller");
const router = (0, express_1.Router)();
router.get('/', fireProduct_controller_1.FireProductController.getAll);
router.get('/:slug', fireProduct_controller_1.FireProductController.getBySlug);
exports.fireProductRoutes = router;
