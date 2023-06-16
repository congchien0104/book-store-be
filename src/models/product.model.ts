import { Document, model, Schema } from "mongoose";
import { ICategory } from './category.model';


export type TProduct = {
    title: string;
    image: string;
    categoryId: ICategory["_id"];
    quantity: number;
    price: number;
    description: string;
};

export interface IProduct extends TProduct, Document {}

const productSchema: Schema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "Category",
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
}
);

const Product = model<IProduct>("Product", productSchema);

export default Product;