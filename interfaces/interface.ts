import { Request, Response } from "express";

export interface Login {
    username?: string;
    password?: string;
};

export interface IUser {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserModel<T> {
    getUsers: () => void;
    getUser: (id: string) => void;
    createUser: (data: T) => void;
    updateUser: (id: string, data: T) => void;
    deleteUser: (id: string) => void;
}

export interface UserController {
    getUsers: (req: Request, res: Response) => void;
    getUser: (req: Request, res: Response) => void;
    getCurrentUser: (req: Request, res: Response) => void;
    createUser: (req: Request, res: Response) => void;
    createAdmin: (req: Request, res: Response) => void;
    updateUser: (req: Request, res: Response) => void;
    deleteUser: (req: Request, res: Response) => void;
}

export interface AuthModel<T> {
    getLogin: (username: T) => void;
}

export interface AuthController {
    getLogin: (req: Request, res: Response) => void;
}