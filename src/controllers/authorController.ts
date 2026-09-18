import type { Request, Response } from "express";
import { authors } from "../data/store";
import type { Author } from "../models/author";

//Retrieving all authors from the database/array
export const getAuthors = (_req: Request, res: Response): void => {
	res.status(200).json(authors);
};

//Retrieving all author from the database/array by id (find functions)
export const getAuthorById = (req: Request, res: Response): void => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id)) {
		res.status(400).json({ error: "ID must be an integer" });
		return;
	}

	const author = authors.find((item) => item.id === id);

	if (!author) {
		res.status(404).json({ error: "Author not found" });
		return;
	}

	res.status(200).json(author);
};

//Adding a neww auther sections
export const createAuthor = (req: Request, res: Response): void => {
	const { name, email } = req.body as { name?: string; email?: string };
	const trimmedName = name?.trim() ?? "";
	const trimmedEmail = email?.trim() ?? "";

	if (!trimmedName || !trimmedEmail) {
		res.status(400).json({ errors: ["Name and email are required"] });
		return;
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
		res.status(400).json({ errors: ["Must be a valid email address"] });
		return;
	}
	const lastAuthor = authors[authors.length - 1];
	const newAuthor: Author = {
		id: lastAuthor ? lastAuthor.id + 1 : 1,
		name: trimmedName,
		email: trimmedEmail,
	};

	authors.push(newAuthor);
	res.status(201).json(newAuthor);
};

//Updating an existing author
export const updateAuthor = (req: Request, res: Response): void => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id)) {
		res.status(400).json({ error: "ID must be an integer" });
		return;
	}

	const author = authors.find((item) => item.id === id);

	if (!author) {
		res.status(404).json({ error: "Author not found" });
		return;
	}

	const { name, email } = req.body as { name?: string; email?: string };
	const trimmedName = name?.trim() ?? "";
	const trimmedEmail = email?.trim() ?? "";

	if (!trimmedName || !trimmedEmail) {
		res.status(400).json({ errors: ["Name and email are required"] });
		return;
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
		res.status(400).json({ errors: ["Must be a valid email address"] });
		return;
	}

	author.name = trimmedName;
	author.email = trimmedEmail;

	res.status(200).json(author);
};

//Deleting an author by id
export const deleteAuthor = (req: Request, res: Response): void => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id)) {
		res.status(400).json({ error: "ID must be an integer" });
		return;
	}

	const authorIndex = authors.findIndex((item) => item.id === id);

	if (authorIndex === -1) {
		res.status(404).json({ error: "Author not found" });
		return;
	}
	authors.splice(authorIndex, 1);
	res.status(200).json({ message: "Author deleted successfully" });
};
