import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import * as bookService from '../../services/book.service';
import ApiError from '../../errors/ApiError';

export const createBook = catchAsync(async (req: Request, res: Response) => {
    const book = await bookService.create(req.body);
    res.send(book);
});

export const getBook = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['bookId'] === 'string') {
        const book = await bookService.getBookById(new mongoose.Types.ObjectId(req.params['bookId']));
        if (!book) {
          throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
        }
        res.send(book);
    }
});

export const updateBook = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['bookId'] === 'string') {
      const book = await bookService.updateBookById(new mongoose.Types.ObjectId(req.params['bookId']), req.body);
      res.send(book);
    }
});

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['bookId'] === 'string') {
      await bookService.deleteBookById(new mongoose.Types.ObjectId(req.params['bookId']));
      res.status(httpStatus.NO_CONTENT).send();
    }
});