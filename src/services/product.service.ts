import httpStatus from 'http-status';
import mongoose from "mongoose";
import Product from '../models/product.model';
import { IProduct, IProductDoc } from '../interfaces/product.interfaces';
/**
 * Create a user
 * @param {IProduct} params
 * @returns {Promise<IProduct>}
 */
export const create = async (params: IProduct): Promise<IProduct> => {
    return await Product.create(params);
};

export const getProductById = async (id: mongoose.Types.ObjectId): Promise<IProductDoc | null> => {
    const result = await Product.findById(id);
    return result;
};

export type UpdateProductBody = Partial<IProduct>;

export const updateProductById = async (
    productId: mongoose.Types.ObjectId,
    updateBody: UpdateProductBody
  ): Promise<IProduct | null> => {
    const product = await getProductById(productId);
    if (!product) {
      //throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    Object.assign(product, updateBody);
    await product.save();
    return product;
};

export const deleteProductById = async (productId: mongoose.Types.ObjectId): Promise<IProduct | null> => {
    const product = await getProductById(productId);
    if (!product) {
      //throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    await product.deleteOne();
    return product;
};