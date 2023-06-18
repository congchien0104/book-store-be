import { Model, Document } from 'mongoose';

export interface ICategory {
  title: string;
  description: string;
}

export interface ICategoryDoc extends ICategory, Document {}

export interface ICategoryModel extends Model<ICategoryDoc> {}
