import express from "express";
import { getComment, postComment } from "../contollers/comment.js";

const router = express.Router();

router.get("/",getComment);
router.post("/",postComment);

export default router;
