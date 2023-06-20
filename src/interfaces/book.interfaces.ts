import { Model, Document } from 'mongoose';
//import { QueryResult } from '../paginate/paginate';

export interface IBook {
  title: string;
  image: string;
  categoryId: string;
  price: number;
  quantity: number;
  description: string;
}

export interface IBookDoc extends IBook, Document {}

export interface IBookModel extends Model<IBookDoc> {
  //paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateBookBody = Partial<IBook>;

