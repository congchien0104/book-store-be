import httpStatus from 'http-status';
import mongoose from "mongoose";
import Book from '../models/book.model';
import { IBook, IBookDoc } from '../interfaces/book.interfaces';
import ApiError from '../errors/ApiError';
/**
 * Create a user
 * @param {IProduct} params
 * @returns {Promise<IBook>}
 */
export const create = async (params: IBook): Promise<IBook> => {
    return await Book.create(params);
};

export const getBookById = async (id: mongoose.Types.ObjectId): Promise<IBookDoc | null> => {
    const result = await Book.findById(id);
    return result;
};

export type UpdateBookBody = Partial<IBook>;

export const updateBookById = async (
    bookId: mongoose.Types.ObjectId,
    updateBody: UpdateBookBody
  ): Promise<IBook | null> => {
    const book = await getBookById(bookId);
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    Object.assign(book, updateBody);
    await book.save();
    return book;
};

export const deleteBookById = async (bookId: mongoose.Types.ObjectId): Promise<IBook | null> => {
    const book = await getBookById(bookId);
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    await book.deleteOne();
    return book;
};