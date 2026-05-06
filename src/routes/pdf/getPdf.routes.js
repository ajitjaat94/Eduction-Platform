import express from "express";
import { getAllPdfs } from "../../controller/pdf/getPdf.controller.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
//import { authorizeRoles } from "../../middlewares/role.middleware.js";
//import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";
import { getPdfValidation } from "../../validations/pdf/getPdf.validations.js";
import { validatorMiddleware } from "../../middlewares/validation.middleware.js";

const getPdfRoutes = express.Router();

getPdfRoutes.get("/pdfs",
    //free 
    // verifyMeddleware,
    // authorizeRoles("user","admin"),
    getPdfValidation,
    validatorMiddleware,
    asyncHelper(getAllPdfs)
);

export const getAllPdfsRoute = getPdfRoutes;
