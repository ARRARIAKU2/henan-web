import { Request, Response } from "express";
import bcrypt from "bcrypt";

import ServiceUsers from "../services/users.service";
import ServiceAuth from "../services/auth.service";

class ControllerUsers {
    constructor() { }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await ServiceUsers.getUsers() as any;

            if (users.length === 0) {
                return res.status(404).json({
                    message: "Users not found!"
                });
            }

            return res.status(200).json({
                message: "Success get data!",
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                message: (error as Error).message
            });
        };
    };

    async getUser(req: Request, res: Response) {
        try {
            const result = await ServiceUsers.getUser(req.params.id) as any;

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User Not found!"
                });
            }

            return res.status(200).json({
                user: "Success Get Data!",
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                message: (error as Error).message
            });
        };
    };

    async getCurrentUser(req: Request, res: Response) {
        try {
            const headers = req.headers;
            const token = headers.authorization as string;
            const decoded = (await ServiceAuth.verifyToken(token)) as any;

            res.status(200).json({
                data: decoded,
            });
        } catch (error) {
            return res.status(500).json({
                message: (error as Error).message
            });
        };
    };

    async createUser(req: Request, res: Response) {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hash(password, 10);
        const userData = {
            username,
            email,
            password: hashedPassword,
            role: "user"
        };

        try {
            const createdUser = await ServiceUsers.createUser(userData);
            res.status(201).json({
                message: "Success Create Data!",
                data: createdUser
            });
        } catch (error) {
            return res.status(500).json({
                message: (error as Error).message
            });
        };
    };

    async createAdmin(req: Request, res: Response) {
        const password: string = await bcrypt.hash(req.body.password, 10);
        const params: any = {
            username: req.body.username,
            email: req.body.email,
            password: password,
            role: "admin",
        };

        try {
            const createdAdmin = await ServiceUsers.createUser(params);
            return res.status(201).json({
                message: "Success Create Data!",
                data: createdAdmin
            });
        } catch (error) {
            return res.status(500).json({
                message: (error as Error).message
            });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            username,
            email,
            password: hashedPassword,
            updated_at: new Date().toISOString()
        };

        try {
            const result = await ServiceUsers.updateUser(req.params.id, userData);
            return res.status(200).json({
                message: "Success Update Data!",
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                message: (error as Error).message
            });
        };
    };

    async deleteUser(req: Request, res: Response) {
        try {
            const result = await ServiceUsers.deleteUser(req.params.id) as any;
            if (result.length === 0) {
                return res.status(404).json({
                    message: "User Not found!"
                });
            };

            res.status(200).json({
                message: "Success Delete Data!",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                message: (error as Error).message
            });
        };
    }
};

export default new ControllerUsers();