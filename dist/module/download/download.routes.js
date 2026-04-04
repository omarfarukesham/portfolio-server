"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadRoutes = void 0;
const express_1 = require("express");
const download_controller_1 = require("./download.controller");
const router = (0, express_1.Router)();
router.get('/:orderId/:ebookId', download_controller_1.DownloadController.downloadPdf);
exports.downloadRoutes = router;
