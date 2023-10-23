import express from "express";
import { login, register, logout } from "../contollers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

export default router;
