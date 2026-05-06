import { body } from "express-validator";

export const adminQuestionValidations = [
    body('question')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('Question is requred'),

    body('category')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('Category is requred'),

    body('exam')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('Exam section is requred'),

    body('level')
        .trim()
        .notEmpty()
        .isString()
        .isIn(['easy', 'medium', 'hard'])
        .withMessage('Level must be easy, medium, hard'),

    body('option')
        .notEmpty()
        .isArray({ min: 4, max: 4 })
        .withMessage('Options must be requred'),


    body('correctOption')
        .trim()
        .notEmpty()
        .isInt({ min: 1, max: 4 })
        .withMessage('correctOption must be requred, between 1 and 4')
]