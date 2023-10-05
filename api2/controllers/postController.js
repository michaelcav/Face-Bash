import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  console.log("post")
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");


    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    ORDER BY p.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;

    // Iniciar uma transação para garantir a consistência
    db.beginTransaction((err) => {
      if (err) return res.status(500).json(err);

      // Consultar os comentários relacionados à postagem
      const selectCommentsQuery = "SELECT id FROM comments WHERE postId = ?";
      db.query(selectCommentsQuery, [postId], (err, commentIds) => {
        if (err) {
          db.rollback(() => {
            return res.status(500).json(err);
          });
        }

        // Excluir os comentários relacionados à postagem
        const deleteCommentsQuery = "DELETE FROM comments WHERE postId = ?";
        db.query(deleteCommentsQuery, [postId], (err) => {
          if (err) {
            db.rollback(() => {
              return res.status(500).json(err);
            });
          }

          // Excluir a postagem
          const deletePostQuery = "DELETE FROM posts WHERE id = ? AND userId = ?";
          db.query(deletePostQuery, [postId, userInfo.id], (err, data) => {
            if (err) {
              db.rollback(() => {
                return res.status(500).json(err);
              });
            }

            // Commit da transação
            db.commit((err) => {
              if (err) {
                db.rollback(() => {
                  return res.status(500).json(err);
                });
              }

              if (data.affectedRows > 0) {
                return res.status(200).json("Post has been deleted.");
              } else {
                return res.status(403).json("You can delete only your post.");
              }
            });
          });
        });
      });
    });
  });
};