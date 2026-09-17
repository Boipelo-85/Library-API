import express = require("express");
import authorRoutes from "./routes/authorRoutes";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { loggerMiddleware } from "./middleware/logger";

export const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use("/v1/authors", authorRoutes);
app.use("/v1/books", bookRoutes);
app.use(errorHandler);
