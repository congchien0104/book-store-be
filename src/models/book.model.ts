import mongoose from "mongoose";
import toJSON from '../toJSON/toJSON';
import { IBookDoc, IBookModel } from '../interfaces/book.interfaces';

const bookSchema = new mongoose.Schema<IBookDoc, IBookModel>(
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
bookSchema.plugin(toJSON);

const Book = mongoose.model<IBookDoc, IBookModel>('Book', bookSchema);

export default Book;