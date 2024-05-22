"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
// Define the Zod schema for Order
exports.orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string().nonempty(),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().int().positive(),
});
exports.default = exports.orderValidationSchema;
