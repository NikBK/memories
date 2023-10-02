import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

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
app.get("/", (req, res) => res.send("Welcome to Memories backend server"));

const PORT = process.env.PORT || 5000;
const MONGOOSE_CONECTION_URL = process.env.MONGOOSE_CONECTION_URL;

mongoose.connect(MONGOOSE_CONECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Listening to port ${PORT}`)))
    .catch((error) => console.log(error.message))
