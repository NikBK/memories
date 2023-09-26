import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;
const MONGOOSE_CONECTION_URL = "mongodb+srv://nikhilbalakrishna5:balakrishnaprema@cluster0.4mfbste.mongodb.net/";

mongoose.connect(MONGOOSE_CONECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Listening to port ${PORT}`)))
    .catch((error) => console.log(error.message))

// mongoose.set("useFindAndModify", false);