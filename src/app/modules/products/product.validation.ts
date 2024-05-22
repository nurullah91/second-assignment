import { z } from "zod";

// Define the Zod schema for Variant
const variantSchema = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
});

// Define the Zod schema for Inventory
const inventorySchema = z.object({
  quantity: z.number().int().nonnegative(), // Ensuring quantity is a non-negative integer
  inStock: z.boolean(),
});

// Define the Zod schema for Product
const productValidationSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number().nonnegative(), // Ensuring price is a non-negative number
  category: z.string().nonempty(),
  tags: z.array(z.string().nonempty()), // Ensuring tags is an array of non-empty strings
  variants: z.array(variantSchema), // Ensuring variants is an array of Variant objects
  inventory: inventorySchema, // Ensuring inventory matches the Inventory schema
});

export default productValidationSchema;
