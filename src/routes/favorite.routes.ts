import { Router } from "express";
import * as favoriteController from "../controllers/favorite.controller.js";

export const favoriteRouter = Router();

favoriteRouter.get("/", favoriteController.findAll);
favoriteRouter.post("/:monumentId", favoriteController.create);
favoriteRouter.delete("/:monumentId", favoriteController.remove);