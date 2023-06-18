import mongoose from 'mongoose';
import { ICategoryDoc, ICategoryModel } from '../interfaces/category.interfaces';

const categorySchema = new mongoose.Schema<ICategoryDoc, ICategoryModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<ICategoryDoc, ICategoryModel>('Category', categorySchema);

export default Category;