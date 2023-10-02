import mongoose from "mongoose";
import Postmessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await Postmessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createPost = async (req, res) => {
    var file = null;
    if (req.file && req.file.path && req.file.path != "null" && req.file.path != "undefined") {
        file = req.file.path;
    }
    const post = { ...JSON.parse(req.body.otherDetails), selectedFile: file };
    try {
        const newPost = new Postmessage(post);
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    var file = null;
    if (req.file && req.file.path && req.file.path != "null" && req.file.path != "undefined") {
        file = req.file.path;
    }
    else if (req.body && req.body.file && req.body.file != "null" && req.body.file != "undefined") {
        file = req.body.file;
    }

    const post = { ...JSON.parse(req.body.otherDetails), selectedFile: file };
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post found with this id");

    const updatedPost = await Postmessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.status(200).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post found with this id");

    await Postmessage.findByIdAndRemove(_id);
    res.status(200).json({ message: "Post deleted successfully" });
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post found with this id");

    const post = await Postmessage.findById(_id);
    const updatedPost = await Postmessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
    res.status(200).json(updatedPost)
}
