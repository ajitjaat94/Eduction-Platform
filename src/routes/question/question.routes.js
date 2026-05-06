import express from "express";
import { question } from "../../controller/question/questions.controller.js";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";
import { userQuestionValidation } from "../../validations/question/userQuestion.validations.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { validatorMiddleware } from "../../middlewares/validation.middleware.js"

const questions = express.Router();
questions.post("/question",
    verifyMeddleware,
    authorizeRoles("user"),
    userQuestionValidation,
    validatorMiddleware,
    asyncHelper(question)
)

export const questionRout = questions;