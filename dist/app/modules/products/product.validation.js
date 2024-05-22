"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Zod schema for Variant
const variantSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty(),
    value: zod_1.z.string().nonempty(),
});
// Define the Zod schema for Inventory
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().int().nonnegative(), // Ensuring quantity is a non-negative integer
    inStock: zod_1.z.boolean(),
});
// Define the Zod schema for Product
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty(),
    description: zod_1.z.string().nonempty(),
    price: zod_1.z.number().nonnegative(), // Ensuring price is a non-negative number
    category: zod_1.z.string().nonempty(),
    tags: zod_1.z.array(zod_1.z.string().nonempty()), // Ensuring tags is an array of non-empty strings
    variants: zod_1.z.array(variantSchema), // Ensuring variants is an array of Variant objects
    inventory: inventorySchema, // Ensuring inventory matches the Inventory schema
});
exports.default = productValidationSchema;
