import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

class Media {
    private upload;

    constructor() {
        this.upload = multer({ storage: multer.memoryStorage() });
        cloudinary.config({
            cloud_name: "dpmmsdjxy",
            api_key: "647487294136952",
            api_secret: "QqYFTekIr0BnHj9gJ6Wn3vlD_F0",
        });
    }

    get uploadMedia() {
        return this.upload;
    }

    get storageMedia() {
        return cloudinary;
    }
}

export default new Media();
