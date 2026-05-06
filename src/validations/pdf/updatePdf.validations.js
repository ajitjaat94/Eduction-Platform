import { body } from "express-validator";
export const updatePdfValidations = [
    body("title")
        .trim()
        .optional(),

    body("exam")
        .trim()
        .optional(),

    body("year")
        .trim()
        .isNumeric()
        .toInt()
        .optional(),

    body("subject")
        .trim()
        .optional(),

    body("type")
        .trim()
        .optional(),

   ];
    body().custom((value, { req }) => {
        const { title, exam, year, subject, type } = req.body;
        if (!title && !exam && !year && !subject && !type) {
            throw new Error("At least one field is required to update");
        }
        return true;
    })