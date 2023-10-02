import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, ''); // Specify the directory where you want to store the uploaded images
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Generate a unique filename for the uploaded image
//     }
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'memories', // Specify the folder in Cloudinary where the images will be stored
    allowedFormats: ['jpg', 'jpeg', 'png'], // Specify the allowed image formats
});

const upload = multer({ storage });
const router = express.Router();

router.get("/", getPosts);
router.post("/", upload.single('file'), createPost);
router.patch("/:id", upload.single('file'), updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;