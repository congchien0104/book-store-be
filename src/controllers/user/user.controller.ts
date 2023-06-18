import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import * as userService from '../../services/user.service';

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.registerUser(req.body);
    res.send(user);
})