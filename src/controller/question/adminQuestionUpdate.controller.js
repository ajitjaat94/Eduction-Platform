import { questions } from "../../models/question.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";

async function questionUpdate(req, res) {
    //Step:1 - Get questionId and category from request 
    const { questionId } = req.params;
    const { question, category, exam, level, option, correctOption } = req.body;

    if (!questionId) {
        return sendResponce(res,
            404,
            false,
            "The requested question was not found",
        )
    }
    //Step:2 - Update question 
    const update = await questions.findByIdAndUpdate(
        questionId,
        {
            $set: {
                question,
                category,
                exam,
                level,
                option,
                correctOption
            }
        },
        { new: true }
    );
    if (!update) {
        return sendResponce(res, 404, false, "Question not found");
    };
    //Step:3 - responce send 
    sendResponce(
        res,
        200,
        true,
        "Update successfully",
        {
            data: {
                update
            }
        }
    );
};

export const adminQuestionUpdate = asyncHelper(questionUpdate);