import { Request, Response } from "express";

import ServiceAuth from "../services/auth.service";

class ControllerAuth {
    constructor() { }

    async getLogin(req: Request, res: Response) {
        const params: any = {
            username: req.body.username,
            password: req.body.password
        }

        try {
            const result = await ServiceAuth.getLogin(params) as any;

            if (!result.success) {
                return res.status(404).json({
                    message: result.message,
                    succes: false
                })
            }

            const user: any = {
                id: result.data.id,
                username: result.data.username,
                email: result.data.email,
                role: result.data.role
            }

            const token = await ServiceAuth.generateToken(user);

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