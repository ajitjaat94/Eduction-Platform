import { query } from "express-validator";
export const getPdfValidation = [
    query('exam')
        .trim()
        .optional(),

    query('year')
        .trim()
        .optional(),

    query('subject')
        .trim()
        .optional(),

    query('type')
        .trim()
        .optional()
]