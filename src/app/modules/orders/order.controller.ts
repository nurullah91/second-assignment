import { Request, Response } from "express";
import { Order } from "./order.interface";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body;

    const validateOrder = orderValidationSchema.parse(order);

    const result = await OrderServices.createOrderIntoDb(validateOrder);

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
