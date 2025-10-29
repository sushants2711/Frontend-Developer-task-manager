import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true
    },
    likes: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export default mongoose.model("post", postSchema);