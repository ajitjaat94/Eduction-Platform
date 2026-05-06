import { adminQuestionUpdate } from "../../controller/question/adminQuestionUpdate.controller.js";
import express from "express";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { adminQuestionValidations } from "../../validations/question/adminQuestionUpload.validations.js";
import { validatorMiddleware } from "../../middlewares/validation.middleware.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
//----------------------------------------------------------------------------------------------

const updateQuestion = express.Router();

updateQuestion.put("/update/:questionId",
    verifyMeddleware,
    authorizeRoles("admin"),
    adminQuestionValidations,
    validatorMiddleware,
    asyncHelper(adminQuestionUpdate)
);

export const adminUpdateQuestion = updateQuestion;