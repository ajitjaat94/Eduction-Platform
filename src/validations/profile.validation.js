import { body } from "express-validator";

export const profileValidation = [
    body('username')
    .trim()
    .optional()
    .isLength({min:3})
    .withMessage('username must be at least 3 cheracters'),

]