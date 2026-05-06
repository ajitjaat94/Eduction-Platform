import express from 'express'
import { verifyMeddleware } from '../../middlewares/verify-User.middlewares.js';
import { result } from '../../controller/question/result.controller.js';
import { asyncHelper } from '../../utils/utils.asyncHandler.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';


const resultQuestionRoute = express.Router();
resultQuestionRoute.get("/result/:sessionId",
    verifyMeddleware,
    authorizeRoles("user"),
    asyncHelper(result)
);

export const resultRout = resultQuestionRoute;