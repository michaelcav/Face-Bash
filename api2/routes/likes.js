import express from "express";
import {
  getLikes,
  // addLike,
  // deleteComment,
} from "../controllers/likesController.js";

const router = express.Router();

router.get("/", getLikes);
// router.post("/", addLike);
// router.delete("/:id", deleteComment);

export default router;