import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}

export const authenticateUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "SECRET_KEY") as any;

        (req as any).userId = decoded.userId;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};