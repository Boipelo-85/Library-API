import { Router } from "express";
import {createAuthor,deleteAuthor,getAuthorById,getAuthors,updateAuthor,} from "../controllers/authorController";
import { getBooksByAuthor } from "../controllers/bookController";
import { validateAuthor } from "../middleware/validation";

const authorRouter = Router();

authorRouter.get("/", getAuthors);
authorRouter.get("/:id", getAuthorById);
authorRouter.get("/:id/books", getBooksByAuthor);
authorRouter.post("/", validateAuthor, createAuthor);
authorRouter.patch("/:id", validateAuthor, updateAuthor);
authorRouter.delete("/:id", deleteAuthor);

export default authorRouter;
