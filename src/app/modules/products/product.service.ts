import { Product } from "./product.interface";
import { ProductModel } from "./product.mode";

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async (searchParams: any) => {
  if (searchParams === undefined) {
    const result = await ProductModel.find();
    return result;
  } else {
    const result = await ProductModel.find({
      $text: { $search: searchParams },
    });
    return result;
  }
};

const getSingleProductById = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const deleteProductById = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

const updateProductById = async (id: string, updateInfo: Partial<Product>) => {
  const result = await ProductModel.updateOne(
    { _id: id },
    { $set: updateInfo }
  );

  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductById,
  deleteProductById,
  updateProductById,
};
