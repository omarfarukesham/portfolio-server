"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ebookOrderRoutes = void 0;
const express_1 = require("express");
const ebookOrder_controller_1 = require("./ebookOrder.controller");
const router = (0, express_1.Router)();
router.post('/', ebookOrder_controller_1.EbookOrderController.create);
router.get('/', ebookOrder_controller_1.EbookOrderController.getAll);
exports.ebookOrderRoutes = router;
