import { body } from "express-validator";

export const userSubmitQuestionValidation = [
    body('sessionId')
        .notEmpty()
        .withMessage('Session not found, Please start a new test.'),

    body('questionId')
        .notEmpty()
        .withMessage('Question not found'),

    body('selectOption')
        .notEmpty()
        .withMessage('Please select an option')
]