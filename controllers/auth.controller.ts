import { Request, Response } from "express";

import ServiceAuth from "../services/auth.service";
import { Login, IUser, AuthController } from "../interfaces/interface";

class ControllerAuth implements AuthController {
    constructor() { }

    async getLogin(req: Request, res: Response) {
        const params = {
            username: req.body.username,
            password: req.body.password
        } as Login;

        try {
            const result = await ServiceAuth.getLogin(params) as any;

            if (!result.success) {
                return res.status(404).json({
                    message: result.message,
                    succes: false
                })
            }

            const user = {
                id: result.data.id,
                username: result.data.username,
                email: result.data.email,
                role: result.data.role
            } as IUser

            const token = await ServiceAuth.generateToken(user) as string;

            return res.status(200).json({
                message: "Success Login",
                success: true,
                token: token
            })
        } catch (error) {
            return res.status(500).json({
                message: (error as Error).message,
                success: false
            })
        };
    };
};

export default new ControllerAuth();