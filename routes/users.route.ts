import { Router } from "express";

import ControllerUser from "../controllers/users.controller";
import Auth from "../middlewares/Auth";


class ApiUsers {
    private router: Router;
    constructor() {
        this.router = Router();
    };

    public routes() {
        this.router.get("/", Auth.Auth, ControllerUser.getUsers);
        this.router.get("/:id", Auth.Auth, ControllerUser.getUser);
        this.router.put("/:id", Auth.Auth, ControllerUser.updateUser);
        this.router.delete("/:id", Auth.Auth, ControllerUser.deleteUser);

        return this.router;
    }
};

export default new ApiUsers();