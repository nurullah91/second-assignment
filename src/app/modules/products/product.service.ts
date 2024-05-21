import { Product } from "./product.interface";
import { ProductModel } from "./product.mode";

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductById = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductById,
};
