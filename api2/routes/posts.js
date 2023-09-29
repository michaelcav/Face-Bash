import express from 'express';
import { getPosts, addPost } from '../controllers/postController.js'

const router = express.Router()

router.get("/", getPosts);
router.get("/", addPost);

export default router