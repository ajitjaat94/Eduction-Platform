import { questions } from "../../models/question.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";


async function questionUpload(req, res) {
    const { question, category, exam, level, option, correctOption } = req.body;

    const createQuestion = await questions.create({
        question,
        category,
        exam,
        level,
        option,
        correctOption
    });
    sendResponce(res,
        201,
        true,
        "question create successfully",
        {
            data: { createQuestion }
        }
    )
}

export const adminQuestionUpload = asyncHelper(questionUpload);