import mongoose from "mongoose";
import Category, { ICategory } from "../models/category.model";

export const getCategoryById = async (id: mongoose.Types.ObjectId): Promise<ICategory | null> => Category.findById(id);

export const getAllCategory = async (): Promise<ICategory[]> => {
    const result = await  Category.find();
    return result;
}