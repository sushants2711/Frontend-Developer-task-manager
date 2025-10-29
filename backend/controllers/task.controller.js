import mongoose from "mongoose";
import taskModel from "../models/task.model.js";
import authModel from "../models/auth.model.js";

// Create a task
export const createTaskController = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const loggedInUser = req.user._id

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid user Id format"
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

        const newTask = new taskModel({
            title,
            description,
            completed,
            user: loggedInUser
        });

        const savedData = await newTask.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Task Created Successfully",
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

// get all the task of logged In User
export const getAllTaskByLoggedInController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const { title, completed, createdAt } = req.query;

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid user Id format"
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

        const filterData = {};
        const sortData = {};

        if (title) {
            filterData.title = { $regex: title, $options: "i" };
        };

        if (completed === "true") {
            filterData.completed = true;
        } else if (completed === "false") {
            filterData.completed = false;
        };

        if (createdAt === "asc") {
            sortData.createdAt = 1;
        } else if (createdAt === "dsc") {
            sortData.createdAt = -1;
        };

        const allTask = await taskModel.find({ user: loggedInUser, ...filterData }).sort(sortData);

        if (!allTask || allTask.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Task Data Available"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Task fetch Successfully",
                data: allTask
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

// get task details by id
export const getTaskDetailsByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Task Id"
                });
        };

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid user Id format"
                });
        };

        const taskExist = await taskModel.findOne({ _id: id, user: loggedInUser });

        if (!taskExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task not Exist in Db"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Task details fetch Successfully",
                data: taskExist
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

// toggle to complete and pending
export const updateTaskController = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Task Id"
                });
        };

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid user Id format"
                });
        };

        const taskExist = await taskModel.findOne({ _id: id, user: loggedInUser });

        if (!taskExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task not Exist in Db"
                });
        };

        const modifiedTask = await taskModel.findByIdAndUpdate(id, { completed: !taskExist.completed }, { new: true });

        if (!modifiedTask) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While Updating the Task"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Task Updated Successfully",
                data: modifiedTask
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

// update the whole task
export const updateTheWholeTaskController = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        const { title, description, completed } = req.body;

        if (!title && !description && !completed) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "At least one field is required"
                });
        };

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Task Id"
                });
        };

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid user Id format"
                });
        };

        const taskExist = await taskModel.findOne({ _id: id, user: loggedInUser });

        if (!taskExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task not Exist in Db"
                });
        };

        const updateTask = {
            title: title || taskExist.title,
            description: description || taskExist.description,
            completed: completed ?? taskExist.completed,
            user: loggedInUser
        };

        const modifiedTask = await taskModel.findByIdAndUpdate(id, updateTask, { new: true });

        if (!modifiedTask) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While Updating the Task"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Task Updated Successfully",
                data: modifiedTask
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
}

// delete the task
export const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Task Id"
                });
        };

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid user Id format"
                });
        };

        const taskExist = await taskModel.findOne({ _id: id, user: loggedInUser });

        if (!taskExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task not Exist in Db"
                });
        };

        const deleteTask = await taskModel.findByIdAndDelete(taskExist._id);

        if (!deleteTask) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While deleting the Task"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Task Delete Successfully"
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