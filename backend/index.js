import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.connect.js";
import authRoute from "./routers/auth.route.js";
import taskRoute from "./routers/task.route.js";
import noteRoute from "./routers/note.controller.js";
import postRoute from "./routers/post.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3200;

connectDb();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/notes", noteRoute);
app.use("/api/v1/post", postRoute);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});