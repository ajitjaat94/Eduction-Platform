import { questions } from "../../models/question.models.js";
import { sendResponce } from "../../utils/utils.responce.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
//------------------------------------------------------------------------------------

async function readQuestion(req, res) {

    //Step:1 - Get query page
    const page = Number(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    //Step:2 Fetch question pagination
    const questionData = await questions.find({})
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })

    const total = await questions.countDocuments();
    const totalPages = Math.ceil(total / limit);

    return sendResponce(res,
        200,
        true,
        "Questions fetched successfully", {
        page,
        limit,
        total,
        totalPages,
        datat: questionData
    }
    );

}

export const adminReadQuestion = asyncHelper(readQuestion);