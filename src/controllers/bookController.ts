import type { Request, Response } from "express";
import { authors, books } from "../data/store";
import type { Book } from "../models/book";

export const getBooks = (_req: Request, res: Response): void => {
	res.status(200).json(books);
};

export const getBookById = (req: Request, res: Response): void => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id)) {
		res.status(400).json({ error: "ID must be an integer" });
		return;
	}

	const book = books.find((item) => item.id === id);

	if (!book) {
		res.status(404).json({ error: "Book not found" });
		return;
	}

	res.status(200).json(book);
};

export const getBooksByAuthor = (req: Request, res: Response): void => {
	const authorId = Number(req.params.id);

	if (!Number.isInteger(authorId)) {
		res.status(400).json({ error: "Author ID must be an integer" });
		return;
	}

	const authorExists = authors.some((author) => author.id === authorId);
	if (!authorExists) {
		res.status(404).json({ error: "Author not found" });
		return;
	}

	const authorBooks = books.filter((book) => book.authorId === authorId);
	res.status(200).json(authorBooks);
};

//Creating a book or adding a book to the database section
export const createBook = (req: Request, res: Response): void => {
	const { title, authorId, year} = req.body as { title?: string; authorId?: number ; year?: number };
	const trimmedTitle = title?.trim() ?? "";
	const parsedAuthorId = Number(authorId);
    const parsedPubYear = Number(year);

	if (!trimmedTitle) {
		res.status(400).json({ errors: ["Title is required"] });
		return;
	}

	if (!Number.isInteger(parsedAuthorId)) {
		res.status(400).json({ errors: ["Author ID must be an integer"] });
		return;
	}
    if (!Number.isInteger(parsedPubYear)) {
		res.status(400).json({ errors: ["Year is required"] });
		return;
	}


	const authorExists = authors.some((author) => author.id === parsedAuthorId);
	if (!authorExists) {
		res.status(400).json({ error: "Author not found" });
		return;
	}

	const lastBook = books[books.length - 1];
	const newBook: Book = {
		id: lastBook ? lastBook.id + 1 : 1,
		title: trimmedTitle,
		authorId: parsedAuthorId,
        year: parsedPubYear
	};

	books.push(newBook);
	res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response): void => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id)) {
		res.status(400).json({ error: "ID must be an integer" });
		return;
	}

	const book = books.find((item) => item.id === id);
	if (!book) {
		res.status(404).json({ error: "Book not found" });
		return;
	}

	const { title, authorId } = req.body as { title?: string; authorId?: number };
	const trimmedTitle = title?.trim() ?? "";
	const parsedAuthorId = Number(authorId);

	if (!trimmedTitle) {
		res.status(400).json({ errors: ["Title is required"] });
		return;
	}

	if (!Number.isInteger(parsedAuthorId)) {
		res.status(400).json({ errors: ["Author ID must be an integer"] });
		return;
	}

	const authorExists = authors.some((author) => author.id === parsedAuthorId);
	if (!authorExists) {
		res.status(400).json({ error: "Author not found" });
		return;
	}

	book.title = trimmedTitle;
	book.authorId = parsedAuthorId;

	res.status(200).json(book);
    
};

export const deleteBook = (req: Request, res: Response): void => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id)) {
		res.status(400).json({ error: "ID must be an integer" });
		return;
	}

	const bookIndex = books.findIndex((item) => item.id === id);

	if (bookIndex === -1) {
		res.status(404).json({ error: "Book not found" });
		return;
	}

	books.splice(bookIndex, 1);
	res.status(200).json({ message: "Book deleted successfully" });
};