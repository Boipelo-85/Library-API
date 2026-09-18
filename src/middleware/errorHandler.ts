import type { ErrorRequestHandler } from "express";

//Error handling section 
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
	console.error(error);
	res.status(500).json({ error: "Internal server error" });	

	res.status(404).json({
		error: "Not Found",
		message : `The request URL ${_req.originalUrl} was not found on this server.`
	})
};
