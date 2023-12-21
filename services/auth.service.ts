import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Auth from "../models/auth.model";

dotenv.config();

class ServiceAuth {
    constructor() { }

    async getLogin(params: any) {
        try {
            const result = await Auth.getLogin(params) as any;

            if (!result) {
                return {
                    message: "User Not Found",
                    status: 404,
                    success: false
                };
            }

            const validatePassword = bcrypt.compareSync(params.password, result.password);

            if (!validatePassword) {
                return {
                    message: "Wrong Password",
                    status: 401,
                    success: false
                };
            }

            return {
                message: "Success Login",
                status: 200,
                success: true,
                data: result
            };
        } catch (error) {
            return error;
        };
    };

    async generateToken(data: any) {
        try {
            const token = Jwt.sign(data, process.env.SECRET_KEY as string);
            return token;
        } catch (error) {
            return error;
        };
    };

    async verifyToken(token: string) {
        try {
            const result = Jwt.verify(token, process.env.SECRET_KEY as string);
            return result;
        } catch (error) {
            return error;
        };
    }
};

export default new ServiceAuth();