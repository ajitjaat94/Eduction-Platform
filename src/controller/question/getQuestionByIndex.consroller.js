import { questions } from "../../models/question.models.js";
import { practiceSession } from "../../models/practiceSession.models.js";
import { sendResponce } from "../../utils/utils.responce.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { trackActivity } from "../../utils/utils.trackActivity.js";

//-------------------------------------------------------------------------------

async function getQuestionsByIndex(req, res) {
    //Step:1 - Get session Id and index
    const { sessionId, index } = req.params
    const session = await practiceSession.findById(sessionId);
    if (!session) {
        return sendResponce(
            res,
            404,
            false,
            "Session not found"
        )
    };

    //step:2 - index 
    const indexNum = Number(index);
    if (Number.isNaN(indexNum) || indexNum < 0 || indexNum >= session.questions.length) {
        return sendResponce(
            res,
            404,
            false,
            "Invalid question Number"
        )
    };

    const questionId = session.questions[indexNum]
    const questionDoc = await questions.findById(questionId).select("-correctOption");
    if (!questionDoc) {
        return sendResponce(res, 404, false, "Question not found")
    };
    //tracking
    await trackActivity({
        userId: req.userId,
        action: "QUESTION _OPEN",
        subject: questionDoc.subject,
        exam: questionDoc.exam,
        year: questionDoc.year
    })

    sendResponce(
        res,
        200,
        true,
        {
            questionNumber: indexNum + 1,
            totalQuestion: session.questions.length,
            data: questionDoc
        }
    )
}
export const questionFetchByIndex = asyncHelper(getQuestionsByIndex);