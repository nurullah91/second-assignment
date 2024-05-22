import { Inventory, Product, Variant } from "./product.interface";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Define the Variant schema
const variantSchema = new Schema<Variant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

// Define the Inventory schema
const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// Define the Product schema
const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

// Create a text index for search
productSchema.index({
  name: "text",
  description: "text",
  category: "text",
  tags: "text",
});

// Create the Product model
export const ProductModel = model("Product", productSchema);
