import express from "express";
import { adminQuestionUpload } from "../../controller/question/adminQuestion.controller.js";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { adminQuestionValidations } from "../../validations/question/adminQuestionUpload.validations.js";
import { validatorMiddleware } from "../../middlewares/validation.middleware.js";

const adminQuestion = express.Router();
adminQuestion.post("/upload",
    verifyMeddleware,
    authorizeRoles("admin"),
    adminQuestionValidations,
    validatorMiddleware,
    asyncHelper(adminQuestionUpload)
);

export const adminQuestionRoute = adminQuestion;