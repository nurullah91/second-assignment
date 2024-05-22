"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const product_service_1 = require("../products/product.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const validateOrder = order_validation_1.default.parse(order);
        const { productId, quantity } = validateOrder;
        // check if the product Id is valid
        const product = yield product_service_1.ProductService.getSingleProductById(productId);
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
        const result = yield order_service_1.OrderServices.createOrderIntoDb(validateOrder);
        // change inventory of the product
        product.inventory.quantity -= quantity;
        if (product.inventory.quantity === 0) {
            product.inventory.inStock = false;
        }
        // send back product info to the mongoDB database
        yield product.save();
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchParams = req.query.email;
        const result = yield order_service_1.OrderServices.getAllOrderFromDb(searchParams);
        if (result.length === 0) {
            res.status(500).json({
                success: false,
                message: "Order not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An Error occurred",
            error: error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
