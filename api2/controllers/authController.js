// controllers/authController.js

import User from '../models/User.js'; //
// User.sync({ alter: true }); 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
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


    // Crie um novo usuário
    await User.create({
      username: req.body.username,
      email: req.body.email,
      hashedPassword,
      name: req.body.name,
    });

    return res.status(200).json('User has been created.');
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const login = (req, res) => {}

export const logout = (req, res) => {}
