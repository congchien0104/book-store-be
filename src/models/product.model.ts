import mongoose from "mongoose";
import toJSON from '../toJSON/toJSON';
import { IProductDoc, IProductModel } from '../interfaces/product.interfaces';

const productSchema = new mongoose.Schema<IProductDoc, IProductModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
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

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);

const Product = mongoose.model<IProductDoc, IProductModel>('Product', productSchema);

export default Product;