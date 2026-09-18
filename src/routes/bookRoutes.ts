import { Router } from "express";
import {createBook,deleteBook,getBookById,getBooks,updateBook,} from "../controllers/bookController";
import { validateBook } from "../middleware/validation";

const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", validateBook, createBook);
bookRouter.patch("/:id", validateBook, updateBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
