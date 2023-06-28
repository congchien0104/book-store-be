import httpStatus from 'http-status';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import Book from '../../models/book.model';
import { IBook, UpdateBookBody } from '../../interfaces/book.interfaces';
import setupTestDB from '../../jest/setupTestDB';

const bookOne = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Drama',
    image: 'testing1',
    categoryId: '123456',
    price: 100000,
    quantity: 10,
    description: 'This is testing1'
}
const bookTwo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Comedy',
    image: 'testing2',
    categoryId: '123456',
    price: 100000,
    quantity: 10,
    description: 'This is testing2'
}

const bookThree = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Sport',
    image: 'testing3',
    categoryId: '123456',
    price: 100000,
    quantity: 10,
    description: 'This is testing3'
}

setupTestDB();


const insertBooks = async (books: Record<string, any>[]) => {
    await Book.insertMany(books.map((book) => ({ ...book })));
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

            expect(res.body.title).toEqual(book.title);
            expect(res.body.quantity).toEqual(book.quantity);
        })

        test('should return 404 not found if get book is empty', async () => {
            await Book.create(bookOne);
            const bookId = new mongoose.Types.ObjectId();
            
            const res = await request(app).get(`/books/${bookId}`).send().expect(httpStatus.NOT_FOUND);
        })
    })

    describe('Get Books: ', () => {

        beforeEach(() => {

        })

        test('should return 200 and successfully get books if data is ok', async () => {
            await insertBooks([bookOne, bookTwo, bookThree]);

            const res = await request(app).get('/books').send().expect(httpStatus.OK);
            expect(res.body.limit).toEqual(10);
            expect(res.body.totalResults).toEqual(3);

            const dbBook = await Book.findById(bookOne._id);
            expect(dbBook).toBeDefined();
            if (!dbBook) return;

            expect(dbBook.title).toEqual(bookOne.title);
            expect(dbBook.image).toEqual(bookOne.image);
        })
    })

    describe('Put update Book', () => {
        let testUpdateBook: UpdateBookBody;
        beforeEach(() => {
            testUpdateBook = {
                title: 'Football',
                price: 200500,
                quantity: 20
            } 
        })

        test('should return 201 and successfully update book if data is ok', async () => {
            await insertBooks([bookOne, bookTwo, bookThree]);

            const res = await request(app).put(`/books/${bookOne._id}`).send(testUpdateBook).expect(httpStatus.OK);
            expect(res.body.title).toEqual(testUpdateBook.title);
            expect(res.body.price).toEqual(testUpdateBook.price);

        })

        test('should return 404 not found if get book is empty', async () => {
            await insertBooks([bookOne, bookTwo]);

            await request(app)
                .put(`/books/${bookThree._id}`)
                .send(testUpdateBook)
                .expect(httpStatus.NOT_FOUND);

        })
    })

    describe('Delete remove Book', () => {
        
        test('should return 204 and successfully delete book if data is ok', async () => {
            await insertBooks([bookOne, bookTwo, bookThree]);

            await request(app)
                .delete(`/books/${bookOne._id}`)
                .send()
                .expect(httpStatus.NO_CONTENT);
        })

        test('should return 404 not found if getBook is empty', async () => {
            await insertBooks([bookOne, bookThree]);

            await request(app)
                .delete(`/books/${bookTwo._id}`)
                .send()
                .expect(httpStatus.NOT_FOUND);
        })
    })
})