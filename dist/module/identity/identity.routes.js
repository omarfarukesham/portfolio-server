"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identityRoutes = void 0;
const express_1 = require("express");
const identity_controller_1 = require("./identity.controller");
const router = (0, express_1.Router)();
router.post('/lookup', identity_controller_1.IdentityController.lookup);
exports.identityRoutes = router;
