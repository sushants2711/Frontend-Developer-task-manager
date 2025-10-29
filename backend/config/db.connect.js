import mongoose from "mongoose";

// create a function to connect with db
export const connectDb = async (req, res) => {
    try {
        await
            mongoose.connect
                (process.env.MONGO_URI)
                .then(() => console.log("Db Connected")) // if db is connected successfully then
                .catch((error) => console.log(`Error Occured While Connecting to Db, ${error}`)); // else if error occured from db
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