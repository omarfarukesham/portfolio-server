"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// Create a new product ----------done
router.post('/', product_controller_1.ProductControllers.createProduct);
// Get all products -------- done
router.get('/', product_controller_1.ProductControllers.getAllProducts);
// Get a single product by ID----done
router.get('/:productId', product_controller_1.ProductControllers.getSingleProduct);
// Update a product by ID ----------- 
router.patch('/:productId', product_controller_1.ProductControllers.updateProduct);
// Delete a product by ID ---------- done
router.delete('/:productId', product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
