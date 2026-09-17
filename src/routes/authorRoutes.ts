import { Router } from "express";
import { getAuthorById, getAuthors } from "../controllers/authorController";

const authorRouter = Router();

authorRouter.get("/", getAuthors);
authorRouter.get("/:id", getAuthorById);

export default authorRouter;
