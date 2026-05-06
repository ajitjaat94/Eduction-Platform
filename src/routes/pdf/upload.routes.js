import express from "express";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";
import { adminUploadPdf } from "../../controller/pdf/upload.controller.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { multerUpload } from "../../middlewares/multer.middleware.js";
import { uploadValidation } from "../../validations/pdf/uploadpdf.validations.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { validatorMiddleware } from "../../middlewares/validation.middleware.js";


const uploadPdfRouter = express.Router();
uploadPdfRouter.post("/upload",
    verifyMeddleware,
    authorizeRoles("admin"),
    multerUpload.fields([
        { name: "file", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]),
    uploadValidation,
    validatorMiddleware,
    asyncHelper(adminUploadPdf)
);

export const adminUploadPdfRoute = uploadPdfRouter;