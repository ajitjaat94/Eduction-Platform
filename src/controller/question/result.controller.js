import { practiceSession } from "../../models/practiceSession.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
//----------------------------------------------------------------------------------------
async function resultApi(req, res) {
    //Step:1- Get session id  and find
    const { sessionId } = req.params;
    if (!sessionId) {
        return sendResponce(res, 404, false, "session not exist");
    }

    const result = await practiceSession.findById(sessionId);
    if (!result) {
        return sendResponce(res, 404, false, "Not found session")
    };

    result.status = "completed";
    await result.save();

    const totalQuestion = result.questions.length;
    const attemptedQuestions = result.answers.length;
    const correct = result.answers.filter(q => q.isCorrect).length;
    const wrong = attemptedQuestions - correct;
    const unattemptQuestions = totalQuestion - attemptedQuestions;
    const percentage = (correct / totalQuestion) * 100;

    sendResponce(
        res,
        200,
        true,
        "Test completed successfully",
        {
            totalQuestion,
            attemptedQuestions,
            correct,
            wrong,
            unattemptQuestions,
            percentage: percentage.toFixed(2)
        }
    );
}

export const result = asyncHelper(resultApi);