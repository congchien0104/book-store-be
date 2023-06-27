import mongoose from "mongoose";
import { ICategory, ICategoryDoc } from '../interfaces/category.interfaces';
import Category from "../models/category.model";

export const getCategoryById = async (id: mongoose.Types.ObjectId): Promise<ICategoryDoc | null> => Category.findById(id);

export const getAllCategory = async (): Promise<ICategoryDoc[] | null> => {
    const result = await  Category.find();
    if(!result) {
        return null;
    }
    return result;
}

export const create = async (params: ICategory) => {
    const result = await Category.create(params);
    return result;
}