import { db } from "../connect.js";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const schema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(4),
    name: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: "Validation fails" });
  }

  // Verifica se o usuário já existe
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [req.body.username], (err, userData) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (userData.length) {
      return res.status(409).json("User already exists!");
    }

    // Verifica se o email já existe
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkEmailQuery, [req.body.email], (err, emailData) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (emailData.length) {
        return res.status(409).json("Email already exists!");
      }

      // Cria um novo usuário
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const insertUserQuery =
        "INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)";
      const values = [
        req.body.username,
        req.body.email,
        hashedPassword,
        req.body.name,
      ];

      db.query(insertUserQuery, values, (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }

        return res.status(200).json("User has been created.");
      });
    });
  });
};

export const login = (req, res) => {
  console.log("login")
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [req.body.username], (err, userData) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (userData.length === 0) {
      return res.status(404).json("Wrong password or username!");
    }

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      userData[0].password
    );

    if (!checkPassword) {
      return res.status(400).json("Wrong password or username!");
    }

    const token = jwt.sign({ id: userData[0].id }, "secretkey");

    const { password, ...others } = userData[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none",
  }).status(200).json("User has been logged out.");
};