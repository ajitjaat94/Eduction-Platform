import express from "express";
import { submitQuestion } from "../../controller/question/submitQuestion.controller.js";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { userSubmitQuestionValidation } from "../../validations/question/userSubmitQuestion.validation.js";
import { validatorMiddleware } from "../../middlewares/validation.middleware.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";

const submitQuestionRout = express.Router();
submitQuestionRout.post("/submit",
    verifyMeddleware,
    authorizeRoles("user"),
    userSubmitQuestionValidation,
    validatorMiddleware,
    asyncHelper(submitQuestion)
);

export const submitRout = submitQuestionRout;