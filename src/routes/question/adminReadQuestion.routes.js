import express from "express";
import { adminReadQuestion } from "../../controller/question/adminReadQuestion.controller.js";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
//----------------------------------------------------------------------------------------
const readQuestionRoute = express.Router();
readQuestionRoute.get("/read",
    verifyMeddleware,
    authorizeRoles("admin"),
    asyncHelper(adminReadQuestion)
);

export const adminReadQuestionRoute = readQuestionRoute;