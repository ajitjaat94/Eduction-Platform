import { questionFetchByIndex } from "../../controller/question/getQuestionByIndex.consroller.js";
import express from "express";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";

const fetchByIndex = express.Router();
fetchByIndex.get("/byIndex/:sessionId/:index",
    verifyMeddleware,
    questionFetchByIndex,
);

export const questionByIndex = fetchByIndex;
