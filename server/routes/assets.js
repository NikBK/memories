import express from "express";
import { getAsset } from "../controllers/posts.js";

const router = express.Router();

router.get("/images/:id", getAsset);

export default router;