import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import * as userService from '../../services/user.service';
import pick from '../../utils/pick';
import { IOptions } from '../../paginate/paginate';

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.registerUser(req.body);
    res.send(user);
})

export const getUsers = catchAsync(async (req: Request, res: Response) => {
    console.log('1c');
    const filter = pick(req.query, ['name', 'role']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
});