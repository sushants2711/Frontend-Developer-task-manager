import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
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
    tags: [
        { type: String }
    ]
}, { timestamps: true });

export default mongoose.model("note", noteSchema);