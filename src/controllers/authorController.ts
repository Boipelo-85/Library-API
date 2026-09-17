import type { Request, Response } from "express";
import { authors } from "../data/store";

export const getAuthors = (_req: Request, res: Response): void => {
	res.status(200).json(authors);
};

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
