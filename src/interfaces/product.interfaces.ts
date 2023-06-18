import { Model, Document } from 'mongoose';
//import { QueryResult } from '../paginate/paginate';

export interface IProduct {
  title: string;
  image: string;
  categoryId: string;
  price: number;
  quantity: number;
  description: string;
}

export interface IProductDoc extends IProduct, Document {}

export interface IProductModel extends Model<IProductDoc> {
  //paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateProductBody = Partial<IProduct>;

