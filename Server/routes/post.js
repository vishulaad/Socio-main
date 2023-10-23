import express from "express";
import { createPost, getPost, deletePost } from "../contollers/post.js";

const router = express.Router();

router.post("/", getPost);
router.post("/create", createPost);
router.delete("/:id", deletePost);

export default router;
