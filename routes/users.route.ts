import { Router } from "express";

import ControllerUser from "../controllers/users.controller";


class ApiUsers {
    private router: Router;
    constructor() {
        this.router = Router();
    };

    public routes() {
        this.router.get("/", ControllerUser.getUsers);
        this.router.get("/:id", ControllerUser.getUser);
        this.router.put("/:id", ControllerUser.updateUser);
        this.router.delete("/:id", ControllerUser.deleteUser);

        return this.router;
    }
};

export default new ApiUsers();