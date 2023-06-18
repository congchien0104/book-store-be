import mongoose from "mongoose";
import { ICategoryDoc } from '../interfaces/category.interfaces';
import Category from "../models/category.model";

export const getCategoryById = async (id: mongoose.Types.ObjectId): Promise<ICategoryDoc | null> => Category.findById(id);

export const getAllCategory = async (): Promise<ICategoryDoc[] | null> => {
    console.log('2s ok');
    const result = await  Category.find();
    if(!result) {
        return null;
    }
    return result;
}