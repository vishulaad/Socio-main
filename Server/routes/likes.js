import express from "express";
import { getLikes, delLike, addLike } from "../contollers/likes.js";

const router = express.Router();

router.post("/", getLikes);
router.post("/like", addLike);
router.post("/del", delLike);

export default router;
