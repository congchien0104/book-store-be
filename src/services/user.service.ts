import mongoose from "mongoose";
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { IUser, IUserDoc, NewRegisteredUser } from "../interfaces/user.interface";
import User from "../models/user.model";


/**
 * Create a user
 * @param {IUser} params
 * @returns {Promise<IUser>}
 */
export const create = async (params: IUser): Promise<IUser> => {
    return await User.create(params);
};

/**
 * Register a user
 * @param {NewRegisteredUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const registerUser = async (userBody: NewRegisteredUser): Promise<IUserDoc> => {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');    }
    return User.create(userBody);
  };

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserById = async (id: mongoose.Types.ObjectId): Promise<IUserDoc | null> => User.findById(id);

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => User.findOne({ email });