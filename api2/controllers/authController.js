// controllers/authController.js

import User from '../models/User.js'; // Importe o modelo User

export const register = async (req, res) => {
  try {
    // Verifique se o usuário já existe
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });

    if (existingUser) {
      return res.status(409).json('User already exists!');
    }

    // Crie um novo usuário
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
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