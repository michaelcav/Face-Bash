import express from 'express';
import { getPosts, addPost, deletePost } from '../controllers/postController.js'

const router = express.Router()

router.get("/", getPosts);
router.post("/", addPost);
router.post("/", deletePost);

export default router