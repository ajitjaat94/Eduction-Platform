import { body } from "express-validator";
export const uploadValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage('Please enter a title'),
    body('exam')
        .trim()
        .notEmpty()
        .withMessage('Please select an exam'),

    body('year')
        .trim()
        .notEmpty()
        .withMessage('Please select a year'),
    body('subject')
        .trim()
        .notEmpty()
        .withMessage('Please select a subject'),
    body('type')
        .trim()
        .notEmpty()
        .withMessage('Please select a type')
];