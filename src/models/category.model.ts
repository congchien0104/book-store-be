import mongoose from 'mongoose';
import { ICategoryDoc, ICategoryModel } from '../interfaces/category.interfaces';
import toJson from '../toJSON/toJSON'

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

categorySchema.plugin(toJson);

const Category = mongoose.model<ICategoryDoc, ICategoryModel>('Category', categorySchema);

export default Category;