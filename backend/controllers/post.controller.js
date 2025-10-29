import postModel from "../models/post.model.js";
import authModel from "../models/auth.model.js";
import mongoose from "mongoose";

// add post controller function
export const addPostController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const { title, content, likes } = req.body;

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid User Id"
                });
        };

        const userExist = await authModel.findById(loggedInUser);

        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };


        const newPost = new postModel({
            title,
            content,
            likes,
            user: loggedInUser
        });

        const savedData = await newPost.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Post added Successfully",
                data: savedData
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// all post controller function
export const getPostController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid User Id"
                });
        };

        const userExist = await authModel.findById(loggedInUser);

        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        const allPost = await postModel.find({ user: loggedInUser });

        if (!allPost || allPost.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Post Available"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch Successfully",
                data: allPost
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// update post controller function
export const updatePostController = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        const { title, content, likes } = req.body;

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid User Id"
                });
        };

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Post Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Post Id format"
                });
        };

        const userExist = await authModel.findById(loggedInUser);

        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        const postExist = await postModel.find({ _id: id, user: loggedInUser });

        if (!postExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Post Data not Exist in Db"
                });
        };

        const updateData = {
            title: title || postExist.title,
            content: content || postExist.content,
            user: loggedInUser,
            likes: likes || postExist.likes
        };

        const updatePostData = await postModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatePostData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While Update the data"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Post Updated Successfully",
                data: updatePostData
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// delete post controller function
export const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid User Id"
                });
        };

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Post Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Post Id format"
                });
        };

        const userExist = await authModel.findById(loggedInUser);

        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        const postExist = await postModel.find({ _id: id, user: loggedInUser });

        if (!postExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Post Data not Exist in Db"
                });
        };

        const deletePost = await postModel.findByIdAndDelete(postExist._id);

        if (!deletePost) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While deleting the Post"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Post data delete Successfully"
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};