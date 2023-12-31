import httpStatus from 'http-status';
import mongoose from "mongoose";
import Book from '../models/book.model';
import { IBook, IBookDoc } from '../interfaces/book.interfaces';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from "../paginate/paginate";
/**
 * Create a user
 * @param {IProduct} params
 * @returns {Promise<IBook>}
 */
export const create = async (params: IBook): Promise<IBook> => {
    return await Book.create(params);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryUsers = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const books = await Book.paginate(filter, options);
    return books;
};

export const getBookById = async (id: mongoose.Types.ObjectId): Promise<IBookDoc | null> => {
    const result = await Book.findById(id);
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
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