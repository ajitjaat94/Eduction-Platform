import { pdf } from "../../models/pdf.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
import { trackActivity } from "../../utils/utils.trackActivity.js";
//-------------------------------------------------------------------------------------

async function getPdf(req, res) {
    //step:1
    const { exam, year, subject, type } = req.query;
    const filter = {};
    if (exam) filter.exam = exam;
    if (year) filter.year = year;
    if (subject) filter.subject = subject;
    if (type) filter.type = type;

    const page = Number(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    //Step:2 - fetch pdf 
    const pdfs = await pdf.find(filter)
        .select("title type exam subject year pdfUrl thumbnailUrl")
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })

    if (pdfs.length === 0) {
        return sendResponce(res, 404, false, "No PDFs found")
    }
    const count = await pdf.countDocuments(filter);
    const totalPages = Math.ceil(count / limit)

    //tracking
    await trackActivity({
        userId: req.userId,
        action: "PDF_OPEN",
        exam: exam,
        subject:subject,
        year:year,
    });
    //Step:3 responce send
    return sendResponce(res, 200, true,
        "PDF fetched successfully",
        {
            count,
            totalPages,
            page,
            data: pdfs
        }
    );
};

export const getAllPdfs = asyncHelper(getPdf);