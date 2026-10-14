import {User} from '../models/userModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';    

export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        satus: 'success',
        results: users.length,
        data: {users},
    });
});

export const getUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {user},
    });
});

export const createUser = asyncHandler(async (req, res, next) => {
    const {name, email, role} = req.body;
    const newUser = await User.create({
        name, 
        email,
        role,
    })

    res.status(201).json({
        status: 'success',
        data: {user: newUser},
    });
});


export const updateUser = asyncHandler(async(req, res, next)=>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {user},
    });
});


export const deleteUser = asyncHandler(async(req, res, next)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return next(new AppError('No user found with that Id', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
})


