import { userInfo } from 'os';
import {db} from '../connect.js'
import jwt from "jsonwebtoken";

export const getPosts = (req, res)  => {
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if(err) return res.status(403).json("Token is not valid")
  })

  const q  = `SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationship AS r ON (p.userId = r.followedUserId) WHERE r.followedUserId= ? OR p.userId =?`;

  db.query(q, [userInfo.id], (err, data ) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}