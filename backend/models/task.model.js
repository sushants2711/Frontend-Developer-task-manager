import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("task", taskSchema);