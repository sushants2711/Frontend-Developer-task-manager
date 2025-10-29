import noteModel from "../models/note.model.js";
import authModel from "../models/auth.model.js";
import mongoose from "mongoose";

// create notes controller function
export const addNoteController = async (req, res) => {
    try {
        // take a variable and store a loggedIn user
        const loggedInUser = req.user._id;

        // take all the data from req.body
        const { title, content, tags } = req.body;

        // If loggedIn user id is missing
        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        // If it is not a valid mongoDb Id
        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid user Id format"
                });
        };

        // check user exist in db or not
        const userExist = await authModel.findById(loggedInUser);

        // If user is not exist 
        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        // create a new instance of notes model
        const newNote = new noteModel({
            title,
            content,
            user: loggedInUser,
            tags
        });

        // saved the notes data
        const savedNote = newNote.save();

        // return a success message
        return res
            .status(201)
            .json({
                success: true,
                message: "Note Created Successfully",
                data: savedNote
            });

    }
    // handle the error part
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// get notes controller function
export const getAllNoteController = async (req, res) => {
    try {
        // take a variable and store a loggedIn user
        const loggedInUser = req.user._id;

        // If loggedIn user id is missing
        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        // If it is not a valid mongoDb Id
        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid user Id format"
                });
        };

        // check user exist in db or not
        const userExist = await authModel.findById(loggedInUser);

        // If user is not exist then
        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        // get all the data not note model of logged in user
        const allNote = await noteModel.find({ user: loggedInUser });

        // If no data is available then
        if (!allNote || allNote.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No notes found"
                });
        };

        // return a success message
        return res
            .status(200)
            .json({
                success: true,
                message: "Notes data fetch Successfully",
                data: allNote
            });

    }
    // handle the error part 
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// update notes controller function
export const updateNoteController = async (req, res) => {
    try {
        // take a id from req.params
        const { id } = req.params;

        // take a variable and store a loggedIn user
        const loggedInUser = req.user._id;

        // take all the data from req.body
        const { title, content, tags } = req.body;

        // If not data is comming then
        if (!title && !content && !tags) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "At least one field is required"
                });
        };

        // Id id is missing
        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Notes Id is missing"
                });
        };

        // If it is not a valid mongoDb id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Notes Id"
                });
        };

        // If loggedIn user id is missing
        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        // If loggedIn user id is not a valid mongoDb id
        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid user Id format"
                });
        };

        // check notes exist or not
        const noteExist = await noteModel.findOne({ _id: id, user: loggedInUser });

        // If notes not exist in db then
        if (!noteExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Notes not exist"
                });
        };

        // store all the update data in a object
        const updateData = {
            title: title || noteExist.title,
            content: content || noteExist.content,
            tags: tags || noteExist.tags,
            user: loggedInUser
        };

        // update the notes data 
        const updateNotesData = await noteModel.findByIdAndUpdate(id, updateData, { new: true });

        // If error occured while updating the data
        if (!updateNotesData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured while updating the data"
                });
        };

        // return a success message
        return res
            .status(200)
            .json({
                success: true,
                message: "Notes updated Successfully",
                data: updateNotesData
            });

    }
    // handle the error part here
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

// delete notes controller function
export const deleteNoteController = async (req, res) => {
    try {
        // take a id from req.params
        const { id } = req.params;

        // take a variable and store a loggedIn user
        const loggedInUser = req.user._id;

        // If notes id is missing
        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Notes Id is missing"
                });
        };

        // If notes id is not a valid mongoDb Id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Notes Id"
                });
        };

        // If loggedIn user id is missing
        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        // If it is not a valid mongoDb Id format
        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid user Id format"
                });
        };

        // check the notes exist in db or not
        const noteExist = await noteModel.findOne({ _id: id, user: loggedInUser });

        // If notes not exist in db then
        if (!noteExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Notes data not exist"
                });
        };

        // delete the notes if it is exist in db
        const deleteData = await noteModel.findByIdAndDelete(noteExist._id);

        // If error occured while deleting the notes data
        if (!deleteData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While deleting the Data"
                });
        };

        // return a success message
        return res
            .status(200)
            .json({
                success: true,
                message: "Notes delete Successfully"
            });

    }
    // handle the error part 
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};