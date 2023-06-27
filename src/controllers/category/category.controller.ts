import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import * as categoryService from '../../services/category.service';

export const getCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategory();
    res.send({ data: categories});
});

export const createCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await categoryService.create(req.body)
    res.send({ category });
})