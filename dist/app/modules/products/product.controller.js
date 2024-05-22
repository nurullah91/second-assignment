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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        // validate product with zod
        const validateProduct = product_validation_1.default.parse(product);
        // Call service function to send this data
        const result = yield product_service_1.ProductService.createProductIntoDB(validateProduct);
        res.status(200).json({
            success: true,
            message: "Product created successfully",
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
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchParams = req.query.searchTerm;
        const result = yield product_service_1.ProductService.getAllProductsFromDB(searchParams);
        if (result.length === 0) {
            res.status(500).json({
                success: false,
                message: "No product found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
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
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getSingleProductById(productId);
        if (result === null) {
            res.status(500).json({
                success: false,
                message: "No product found with the ID",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Product fetched successfully!",
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.deleteProductById(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An Error occurred",
            error: error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateInfo = req.body;
        const result = yield product_service_1.ProductService.updateProductById(productId, updateInfo);
        if (result.matchedCount === 0) {
            res.status(500).json({
                success: false,
                message: "No product found with the ID",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Product updated successfully!",
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
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
};
