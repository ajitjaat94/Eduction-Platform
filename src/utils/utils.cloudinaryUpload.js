import { cloudinaryConfig } from "../config/cloudinary.config.js";
import streamifier from "streamifier"

export const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinaryConfig.uploader.upload_stream({ folder },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};
