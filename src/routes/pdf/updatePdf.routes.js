import express from "express";
import { updatePdf } from "../../controller/pdf/updatePdf.controller.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { updatePdfValidations } from "../../validations/pdf/updatePdf.validations.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { validatorMiddleware } from "../../middlewares/validation.middleware.js";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";

const updateRoute = express.Router();
updateRoute.put("/:id",
    verifyMeddleware,
    authorizeRoles("admin"),
    updatePdfValidations,
    validatorMiddleware,
    asyncHelper(updatePdf));

export const updatePdfRoute = updateRoute;