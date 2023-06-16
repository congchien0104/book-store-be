import { Document, model, Schema } from "mongoose";

/**
 * Type to model the User Schema for TypeScript.
 * @param title:string
 * @param description:string
 */

export type TCategory = {
  title: string;
  description: string;
};

/**
 * Mongoose Document based on TUser for TypeScript.
 * https://mongoosejs.com/docs/documents.html
 *
 * TCategory
 * @param title:string
 * @param description:string
 */

export interface ICategory extends TCategory, Document {}

const categorySchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
}
);

/**
 * Mongoose Model based on TUser for TypeScript.
 * https://mongoosejs.com/docs/models.html
 *
 * TCategory
 * @param title:string
 * @param description:string
 */

const Category = model<ICategory>("Category", categorySchema);

export default Category;