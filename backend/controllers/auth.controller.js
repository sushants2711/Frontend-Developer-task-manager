import bcrypt from "bcryptjs";
import authModel from "../models/auth.model.js";
import { sendCookies } from "../middlewares/send.cookie.js";
import mongoose from "mongoose";


// signup controller function
export const signupController = async (req, res) => {
    try {
        // take all the data from req.body
        const { name, email, password, confirmPassword } = req.body;

        // compare the password is same or not
        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Password not match",
                });
        };

        // check user exist or not
        const userExist = await authModel.findOne({ email });

        // if user already exist then
        if (userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User already exist",
                });
        };

        // hashing the password 
        const salt_round = 10;
        const hash_password = await bcrypt.hash(password, salt_round);

        // create a new instance of authmodel
        const newUser = new authModel({
            name,
            email,
            password: hash_password
        });

        // saved the user in db
        const savedUser = await newUser.save();

        // call the cookies function this will send the cookies to the browser
        await sendCookies(savedUser._id, res);

        // send a success message 
        return res
            .status(201)
            .json({
                success: true,
                message: "Signup Successfully",
                name: savedUser.name,
                email: savedUser.email
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

// login controller function
export const loginController = async (req, res) => {
    try {
        // take all the data from req.body
        const { email, password } = req.body;

        // check user exist or not
        const userExist = await authModel.findOne({ email });

        // if user is not exist
        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        // compare the password with the help of bcryptjs
        const comparePassword = await bcrypt.compare(password, userExist.password);

        // if password is not match then
        if (!comparePassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Password Credentials"
                });
        };

        // call a cookie function this will send a cookie
        await sendCookies(userExist._id, res);

        // return a success message
        return res
            .status(200)
            .json({
                success: true,
                message: "Logged In Successfully",
                name: userExist.name,
                email: userExist.email
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

// logout controller function
export const logoutController = async (req, res) => {
    try {
        // store a loggedIn user in a variable
        const loggedInUser = req.user._id;

        // if loggedIn user not available
        if (!loggedInUser) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "User id is missing.",
                });
        };

        // If it is not a valid mongoDb Id
        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format.",
                });
        };

        // clear the cookie token
        res.cookie("jwt", "", { maxAge: 0 });

        // return a success message
        return res
            .status(200)
            .json({
                success: true,
                message: "Logout successfully",
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

// delete controller function
export const deleteController = async (req, res) => {
    try {
        // store a loggedIn user in a variable
        const loggedInUser = req.user._id;

        // if loggedIn user not available
        if (!loggedInUser) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "User id is missing.",
                });
        };

        // If it is not a valid mongoDb Id
        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format.",
                });
        };

        // check user exist or not
        const userExist = await authModel.findById(loggedInUser);

        // If user not exist in db then
        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        // delete the user from db
        const deleteUser = await authModel.findByIdAndDelete(userExist._id);

        // If user is not deleted by any chance
        if (!deleteUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While deleting the data"
                });
        };

        // clear a cookie from the browser
        res.clearCookie("jwt");

        // send a return message
        return res
            .status(200)
            .json({
                success: true,
                message: "User Deleted Successfully"
            });

        // handle the error part
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

// profile details controller
export const profileDetailsController = async (req, res) => {
    try {
        // store a loggedIn user in a variable
        const loggedInUser = req.user._id;

        // If loggedIn user not available
        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        // If loggedIn user is not a valid mongoDb Id
        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDB Id format"
                });
        };

        // check user exist or not if exist not store the password field in this variable
        const userExist = await authModel.findById(loggedInUser).select("-password");

        // If user not exist in db
        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        // send a success message
        return res
            .status(200)
            .json({
                success: true,
                message: "User fetch Successfully",
                data: userExist
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

// update the user profile
export const updateProfileController = async (req, res) => {
    try {
        // take a variable and store a loggedIn user
        const loggedInUser = req.user._id;

        // take all the data from req.body
        const { name, email, password } = req.body;

        // If loggedIn user Id is missing
        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        // If loggedIn user Id is not a valid mongoDb Id format
        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDB Id format"
                });
        };

        // If not data available then send a error to the user
        if (!name && !email && !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "At least one field is required to update the profile data"
                });
        };

        // check user exist or not
        const userExist = await authModel.findById(loggedInUser).select("-password");

        // If user not exist in db
        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not Exist"
                });
        };

        // If email is come from req.body then check email that come from req.body is equal to userExist email with them or not
        if (email && email !== userExist.email) {
            // If not then check email exist in db or not
            const emailExist = await authModel.findOne({ email });

            // If email is already exist in db then send a error message
            if (emailExist) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Email is already registered to someone else account"
                    });
            };
        };

        // hash the password with the help of bcryptjs if password is come from req.body
        let salt_round = 10;
        let hash_password = null;

        if (password) {
            hash_password = await bcrypt.hash(password, salt_round);
        };

        // store all the data 
        const updateData = {
            name: name || userExist.name,
            email: email || userExist.email,
            password: hash_password !== null ? hash_password : userExist.password
        };

        // update the user profile 
        const updateUserProfile = await authModel.findByIdAndUpdate(loggedInUser, updateData, { new: true }).select("-password");

        // If error occured while updating the user profile
        if (!updateUserProfile) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While Updating the data"
                });
        };

        // return a success message
        return res
            .status(200)
            .json({
                success: true,
                message: "User Profile Update Successfully",
                data: updateUserProfile
            });

    } // handle the error part also
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