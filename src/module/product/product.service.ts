import mongoose from "mongoose";
import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

// Create a new product
const createProductIntoDB = async (payload: Product): Promise<Product> => {
  const result = await ProductModel.create(payload);
  return result;
};

// Get all products
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// Get single product following by id
const getSingleProdutFromDB = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // console.error('Invalid ID format');
    return null;
  }

  const result = await ProductModel.findById(id); 
  return result;
};


// Update a product by ID
const updateProductInDB = async (id: string, data: Product) => {
  const result = await ProductModel.findByIdAndUpdate(id, data, {new: true})
  return result;
};

// Delete a product by ID
const deleteProductFromDB = async (id: string): Promise<Product | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const result = await ProductModel.findOneAndDelete({ _id: id }); 
  return result;
};


//all service is exported from this function
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProdutFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
