import { Router } from "express";

import ControllerAuth from "../controllers/auth.controller";
import ControllerUsers from "../controllers/users.controller";
import Auth from "../middlewares/Auth";

class ApiLogin {
    private router: Router;
    constructor() {
        this.router = Router();
    };

    public routes() {
        this.router.post("/login", ControllerAuth.getLogin);
        this.router.get("/user", Auth.Auth, ControllerUsers.getCurrentUser);
        this.router.post("/register", ControllerUsers.createUser);
        this.router.post("/registeradmin", Auth.AuthSuperAdmin, ControllerUsers.createAdmin);

        return this.router;
    };
};

export default new ApiLogin();