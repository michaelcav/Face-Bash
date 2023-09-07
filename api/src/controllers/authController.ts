// controllers/authController.js

import User from '../models/User'; //
// User.sync({ alter: true }); 
import bcrypt from "bcryptjs";
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import {RegisterUserType} from '../interfaces/registerUser'

export const register = async (req: Request, res: Response) => {
  try {
    // Verifique se o usuário já existe
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });

    if (existingUser) {
      return res.status(409).json('User already exists!');
    }

     // Verifique se o usuário já existe
     const existingEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingEmail) {
      return res.status(409).json('Email already exists!');
    }

    const saltRounds = 10; // Número de salt rounds
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Crie um novo usuário
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    return res.status(200).json('User has been created.');
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const login = (req: Request, res: Response) => {}

export const logout = (req: Request, res: Response) => {}












