import express from "express";
import { verifyCookies } from "../middlewares/verify.cookie.js";
import { createPostMiddleware, updatePostMiddleware } from "../middlewares/post.middleware.js";
import { addPostController, deletePostController, getPostController, updatePostController } from "../controllers/post.controller.js";


const postRoute = express.Router();

postRoute.route("/add").post(verifyCookies, createPostMiddleware, addPostController);
postRoute.route("/all").get(verifyCookies, getPostController);
postRoute.route("/update/:id").put(verifyCookies, updatePostMiddleware, updatePostController);
postRoute.route("/delete/:id").delete(verifyCookies, deletePostController);

export default postRoute;