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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_mode_1 = require("./product.mode");
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_mode_1.ProductModel.create(product);
    return result;
});
const getAllProductsFromDB = (searchParams) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchParams === undefined) {
        const result = yield product_mode_1.ProductModel.find();
        return result;
    }
    else {
        const result = yield product_mode_1.ProductModel.find({
            $text: { $search: searchParams },
        });
        return result;
    }
});
const getSingleProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_mode_1.ProductModel.findById(id);
    return result;
});
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_mode_1.ProductModel.deleteOne({ _id: id });
    return result;
});
const updateProductById = (id, updateInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_mode_1.ProductModel.updateOne({ _id: id }, { $set: updateInfo });
    return result;
});
exports.ProductService = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductById,
    deleteProductById,
    updateProductById,
};
