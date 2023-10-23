import express from "express";
import { getUser, updateUser, allUser } from "../contollers/user.js";

const router = express.Router();

router.post("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/", allUser);

export default router;
