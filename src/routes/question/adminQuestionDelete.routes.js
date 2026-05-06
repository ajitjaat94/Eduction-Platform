import { adminQuestionDelete } from "../../controller/question/adminQuestionDelete.controller.js";
import express from "express";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
//--------------------------------------------------------------------------------------------
const deleteQuestionRoute = express.Router();
deleteQuestionRoute.delete("/delete/:questionId",
    verifyMeddleware,
    authorizeRoles("admin"),
    asyncHelper(adminQuestionDelete)
);
export const adminQuestionDeleteRoute = deleteQuestionRoute;