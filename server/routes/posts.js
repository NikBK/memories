import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'memories', // Specify the folder in Cloudinary where the images will be stored
        allowedFormats: ['jpg', 'jpeg', 'png'], // Specify the allowed image formats
        public_id: (req, file) => file.originalname
    }
});

const upload = multer({ storage });
const router = express.Router();

router.get("/", getPosts);
router.post("/", upload.single('file'), createPost);
router.patch("/:id", upload.single('file'), updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;