import express from "express";
import { verifyCookies } from "../middlewares/verify.cookie.js";
import { addNotesMiddleware, updateNotesMiddleware } from "../middlewares/note.middleware.js";
import { addNoteController, deleteNoteController, getAllNoteController, updateNoteController } from "../controllers/note.controller.js";

const noteRoute = express.Router();

noteRoute.route("/add").post(verifyCookies, addNotesMiddleware, addNoteController);
noteRoute.route("/all").get(verifyCookies, getAllNoteController);
noteRoute.route("/update/:id").put(verifyCookies, updateNotesMiddleware, updateNoteController);
noteRoute.route("/delete/:id").delete(verifyCookies, deleteNoteController);

export default noteRoute;