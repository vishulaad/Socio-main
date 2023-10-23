import express from "express";
import { getRel, addRel, delRel } from "../contollers/rel.js";

const router = express.Router();

router.get("/", getRel);
router.post("/", addRel);
router.post("/del", delRel);

export default router;
