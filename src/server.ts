import { Server } from "http";
import { app } from "./app";
import express , {Express} from "express";

const PORT = Number(process.env.PORT) || 3000;
//http://localhost:3000/authors/2
app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
});

