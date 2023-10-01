import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';


import postRoutes from "./routes/posts.js";
import assetRoutes from "./routes/assets.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static('./'));

app.use("/posts", postRoutes);
app.use("/public", assetRoutes);
app.get("/:id", (req, res) => {
    try {
        var __dirname = url.fileURLToPath(new URL('.', import.meta.url));
        __dirname = path.dirname(__dirname);
        res.sendFile(__dirname + req.originalUrl);
    } catch (error) {
        res.status(404).json({ message: error })
    }
});
app.get("/", (req, res) => res.send("Welcome to Memories backend server"));

function createDirectories(pathname) {
    const __dirname = path.resolve();
    pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
    if (!fs.existsSync(pathname)) {
        fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, e => {
            if (e) {
                console.error(e);
            } else {
                console.log('Successfully created public directory');
            }
        });
    }
}
//createDirectories("./public/images");

const PORT = process.env.PORT || 5000;
const MONGOOSE_CONECTION_URL = process.env.MONGOOSE_CONECTION_URL;

mongoose.connect(MONGOOSE_CONECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Listening to port ${PORT}`)))
    .catch((error) => console.log(error.message))
