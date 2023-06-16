import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import * as productService from '../../services/product.service';

export const createProduct = catchAsync(async (req: Request, res: Response) => {
    const product = await productService.create(req.body);
    res.send(product);
});

export const getProduct = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['productId'] === 'string') {
        const product = await productService.getProductById(new mongoose.Types.ObjectId(req.params['productId']));
        if (!product) {
          //throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        res.send(product);
    }
});

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['productId'] === 'string') {
      const product = await productService.updateProductById(new mongoose.Types.ObjectId(req.params['productId']), req.body);
      res.send(product);
    }
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['productId'] === 'string') {
      await productService.deleteProductById(new mongoose.Types.ObjectId(req.params['productId']));
      res.status(httpStatus.NO_CONTENT).send();
    }
});