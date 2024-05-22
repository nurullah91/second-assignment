import { Request, Response } from "express";
import { Order } from "./order.interface";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";
import { ProductService } from "../products/product.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body;

    const validateOrder = orderValidationSchema.parse(order);
    const { productId, quantity } = validateOrder;

    // check if the product Id is valid
    const product = await ProductService.getSingleProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // check order quantity and product quantity
    if (quantity > product.inventory.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    // Create a order after checking quantity
    const result = await OrderServices.createOrderIntoDb(validateOrder);

    // change inventory of the product
    product.inventory.quantity -= quantity;
    if (product.inventory.quantity === 0) {
      product.inventory.inStock = false;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Order created successfully",
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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const searchParams = req.query.email;
    const result = await OrderServices.getAllOrderFromDb(searchParams);

    if (result.length === 0) {
      res.status(500).json({
        success: false,
        message: "Order not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
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

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
