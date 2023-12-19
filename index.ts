import express, { Express } from "express";

class Server {
  private app: Express;
  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  run() {
    try {
      this.app.listen(3000, () => {
        console.log("Server running on port 3000");
      });
    } catch (error) {
      console.error("Error starting server:", error);
    }
  }
}

new Server().run();
