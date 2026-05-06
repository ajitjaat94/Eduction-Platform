import multer from "multer";

const stroage = multer.memoryStorage();
//cb = callback function
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only PDF and image allowed"), false)
    }
};
const upload = multer({
    stroage,
    fileFilter,
    limits: { fileSize: 15 * 1024 * 1024 }
});

export const multerUpload = upload;