import { practiceSession } from "../../models/practiceSession.models.js";
import { questions } from "../../models/question.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
//-------------------------------------------------------------------------------------
async function submitQuestionApi(req, res) {
    //Step:1 - get sessionId and questionID , selectOption find
    const { sessionId, questionId, selectOption } = req.body;
    const session = await practiceSession.findById(sessionId);

    if (!session) {
        return sendResponce(res, 404, false, "session not found")
    };

    if (!session.questions.includes(questionId)) {
        return sendResponce(res, 404, false, "Questions not found in session");
    };

    //Step:2 - Find correctOption  in DB
    const question = await questions.findById(questionId);
    if (!question) {
        return sendResponce(res, 404, false, "No questions found for the selected criteria")
    }
    const isCorrect = selectOption === question.correctOption;

    //Step:3 - Upade selectedOption  and push data inDB 
    const matchedAnswer = session.answers.find(
        a => a.questionId.toString() === questionId
    )
    if (matchedAnswer) {
        matchedAnswer.selectOption = selectOption;
        matchedAnswer.isCorrect = isCorrect;
    } else {
        session.answers.push({
            questionId,
            selectOption,
            isCorrect
        })
    };
    await session.save()
    sendResponce(
        res,
        200,
        true,
        "Answer submitted successfully",
        {
            correct: isCorrect,
            correctOption: question.correctOption
        }
    )
}

export const submitQuestion = asyncHelper(submitQuestionApi);