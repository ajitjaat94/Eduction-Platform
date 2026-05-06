import { body } from "express-validator";

export const userQuestionValidation = [
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is requred'),

    body('exam')
        .trim()
        .optional(),

    body('level')
        .trim()
        .optional()

]
