import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await registerUserService(req.body);

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const result = await loginUserService(email, password);

        res.status(200).json({
            message: "Login successful",
            token: result.token,
            user: result.user
        });

    } catch (error: any) {
        res.status(401).json({
            message: error.message
        });
    }
};