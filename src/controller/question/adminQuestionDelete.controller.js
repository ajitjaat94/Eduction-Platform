import { questions } from "../../models/question.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
//----------------------------------------------------------------------------------------
async function deleteQuestion(req, res) {
    //Step:1 - Get questionId 
    const { questionId } = req.params;
    if (!questionId) {
        return sendResponce(res, 400, false, "Question not found questionId")
    };

    //Step:2 - question find and delete
    const question = await questions.findByIdAndDelete(questionId)
    if (!question) {
        return sendResponce(res, 404, false, "Question not found")
    };
    sendResponce(res,
        200,
        true,
        "Question delete successfully",
    );

};

export const adminQuestionDelete = asyncHelper(deleteQuestion);
