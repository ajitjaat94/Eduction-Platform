import { questions } from "../../models/question.models.js";
import { practiceSession } from "../../models/practiceSession.models.js"
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
//----------------------------------------------------------------------------------

async function questionApi(req, res) {
    //Step:1 - get filters
    const { category, exam, level } = req.body;
    const user = req.user.userId
    const filter = {};
    Object.entries({ category, exam, level }).forEach(([key, value]) => {
        if (value) filter[key] = value;
    });

    //Step:2 - ongoing session resume
    const oldSessionIsExist = await practiceSession.findOne(
        {
            userId: user,
            status: "ongoing"
        }
    );
    if (oldSessionIsExist) {
        return sendResponce(res, 200, true,
            "Your previous test session is still in progress.",
            { session: oldSessionIsExist._id }
        )
    };

    //Step:3 - User who have already attempted the question will not be display
    const oldSessionQuestions = await practiceSession.find(
        { userId: user },
        { questions: 1 }
    );
    const alreadyAttemptedQuestion = oldSessionQuestions.flatMap(q => q.questions)

    //Step:4 - find filter question in random  in DB 
    let randomQuestion = await questions.aggregate([
        {
            $match: {
                ...filter,
                _id: { $nin: alreadyAttemptedQuestion }
            }
        },
        { $sample: { size: 20 } }
    ])


    if (randomQuestion.length < 20) {
        const fallbackQuestions = await questions.aggregate([
            { $match: filter },
            { $sample: { size: 20 } }
        ])
        randomQuestion = fallbackQuestions
    };

    if (!randomQuestion || randomQuestion.length === 0) {
        return sendResponce(res,
            404,
            false,
            "No questions found for the selected criteria"
        );
    }

    //Step:5 - create session and find questions ids 
    const questionsIds = randomQuestion.map(q => q._id)

    const session = await practiceSession.create({
        userId: user,
        questions: questionsIds,
        startedAt: new Date()
    });

    sendResponce(
        res,
        200,
        true,
        {
            sessionId: session._id,
            totalQuestion: questionsIds.length
        }
    )

}
export const question = asyncHelper(questionApi);