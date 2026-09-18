import type { NextFunction, Request, Response } from "express";

export const validateAuthor = (req: Request, res: Response, next: NextFunction): void => {
	const { name, email } = req.body ?? {};
	const errors: string[] = [];

	if (!name || typeof name !== "string" || !name.trim()) {
		errors.push("Name is required");
	}
	if (!email || typeof email !== "string" || !email.trim()) {
		errors.push("Email is required");
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
		errors.push("Must be a valid email address");
	}
	if (errors.length > 0) {
		res.status(400).json({ errors });
		return;
	}

	next();
};

export const validateBook = (req: Request, res: Response, next: NextFunction): void => {
	const { title, authorId } = req.body ?? {};
	const errors: string[] = [];

	if (!title || typeof title !== "string" || !title.trim()) {
		errors.push("Title is required");
	}

	if (authorId === undefined || authorId === null || !Number.isInteger(Number(authorId))) {
		errors.push("Author ID must be an integer");
	}

	if (errors.length > 0) {
		res.status(400).json({ errors });
		return;
	}

	next();
};
