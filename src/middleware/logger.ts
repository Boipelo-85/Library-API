import type { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req:Request , res:Response , next:NextFunction) =>{

    console.log(`[${new Date().toDateString()}] ${req.method} ${req.url}`);
    next();

}