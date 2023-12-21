import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import ApiUsers from "./routes/users.route";

dotenv.config();

const PORT = process.env.PORT;

class Server {
    private app: Express;
    constructor() {
        this.app = express();

        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use("/api/users", ApiUsers.routes());
    }

    run() {
        try {
            this.app.listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`);
            });
        } catch (error) {
            console.error("Unable to connect to the Server:", error);
        }
    }
}

new Server().run();
