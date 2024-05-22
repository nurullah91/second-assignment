import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

// Order Schema
const orderSchema = new Schema<Order>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Create model for Order
export const OrderModel = model("Order", orderSchema);
