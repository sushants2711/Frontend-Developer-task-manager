import express from "express";
import { verifyCookies } from "../middlewares/verify.cookie.js";
import { createTaskMiddleware, updateTaskMiddleware } from "../middlewares/task.middleware.js";
import { createTaskController, deleteTaskController, getAllTaskByLoggedInController, getTaskDetailsByIdController, updateTaskController, updateTheWholeTaskController } from "../controllers/task.controller.js";

const taskRoute = express.Router();

taskRoute.route("/add").post(verifyCookies, createTaskMiddleware, createTaskController);
taskRoute.route("/all").get(verifyCookies, getAllTaskByLoggedInController);
taskRoute.route("/details/:id").get(verifyCookies, getTaskDetailsByIdController);
taskRoute.route("/update/toggle-task/:id").put(verifyCookies, updateTaskController);
taskRoute.route("/update/:id").put(verifyCookies, updateTaskMiddleware, updateTheWholeTaskController);
taskRoute.route("/delete/:id").delete(verifyCookies, deleteTaskController);

export default taskRoute;