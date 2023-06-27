import httpStatus from 'http-status';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import Book from '../../models/book.model';
import { IBook } from '../../interfaces/book.interfaces';
import setupTestDB from '../../jest/setupTestDB';

const bookOne = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Drama',
    image: 'testing',
    categoryId: '123456',
    price: 100000,
    quantity: 10,
    description: 'This is testing'
}
setupTestDB();


const insertBooks = async (books: Record<string, any>[]) => {
    console.log('1 ok');
    await Book.insertMany(books.map((book) => ({ book })));
};


describe('Book controller', () => {
    describe('Post create book: ', () => {
        let book: IBook;
        beforeEach(() => {
            book = {
                title: 'Drama',
                image: 'testing',
                categoryId: '123456',
                price: 100000,
                quantity: 10,
                description: 'This is testing'
            }
        })

        test('should return 201 and successfully create new book if data is ok', async () => {

            const res = await request(app).post('/books').send(book).expect(httpStatus.OK);
      
            expect(res.body).toHaveProperty('title');
            expect(res.body.title).toEqual('Drama');
      
            const dbBook = await Book.findById(res.body.id);
            expect(dbBook).toBeDefined();
            if (!dbBook) return;
      
            expect(dbBook.title).toBe(book.title);
            expect(dbBook).toMatchObject({ title: book.title, image: book.image, categoryId: book.categoryId, price: book.price, quantity: book.quantity, description: book.description });
        });

        test('should return 400 error if title is invalid', async () => {
            const testBook = {
                image: 'testing',
                categoryId: '123456',
                price: 100000,
                quantity: 10,
                description: 'This is testing'
            }
            await request(app).post('/books').send(testBook).expect(httpStatus.BAD_REQUEST);
        });

    })

    describe('Get Book: ', () => {
        let book: IBook;
        beforeEach(() => {
            book = {
                title: 'Drama',
                image: 'testing',
                categoryId: '123456',
                price: 100000,
                quantity: 10,
                description: 'This is testing'
            }
        })

        test('should return 200 and successfully get book if data is ok', async () => {
            await Book.create(bookOne);
            
            const res = await request(app).get(`/books/${bookOne._id}`).send().expect(httpStatus.OK);
        })

        // test('should return 400 error if bookId is bad request', async () => {
        //     const bookId = '123';
        //     await Book.create(bookOne);
            
        //     const res = await request(app).get(`/books/${bookId}`).send().expect(httpStatus.NOT_FOUND);
        // })
    })
})