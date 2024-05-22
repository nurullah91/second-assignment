import { Request, Response } from "express";
import { Product } from "./product.interface";
import { ProductService } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;

    // validate product with zod
    const validateProduct = productValidationSchema.parse(product);
    // Call service function to send this data
    const result = await ProductService.createProductIntoDB(validateProduct);

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchParams: any = req.query.searchTerm;
    const result = await ProductService.getAllProductsFromDB(searchParams);

    if (result.length === 0) {
      res.status(500).json({
        success: false,
        message: "No product found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An Error occurred",
      error: error,
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleProductById(productId);

    if (result === null) {
      res.status(500).json({
        success: false,
        message: "No product found with the ID",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An Error occurred",
      error: error,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.deleteProductById(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An Error occurred",
      error: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateInfo = req.body;

    const result = await ProductService.updateProductById(
      productId,
      updateInfo
    );

    if (result.matchedCount === 0) {
      res.status(500).json({
        success: false,
        message: "No product found with the ID",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An Error occurred",
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
