import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// Create a new product ----------done
router.post('/', ProductControllers.createProduct);

// Get all products -------- done
router.get('/', ProductControllers.getAllProducts);

// Get a single product by ID----done
router.get('/:productId', ProductControllers.getSingleProduct);

// Update a product by ID ----------- 
router.patch('/:productId', ProductControllers.updateProduct);

// Delete a product by ID ---------- done
router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
