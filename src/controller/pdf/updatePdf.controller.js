import { pdf } from "../../models/pdf.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
//----------------------------------------------------------------------------------
async function updatePdfApi(req, res) {
    //step:1
    const { id } = req.params;
    if (!id) {
        return sendResponce(res, 404, false, "pdf not found")
    }
    const { title, exam, year, subject, type } = req.body;
    //step:2
    const update = await pdf.findByIdAndUpdate(
        id,
        {
            $set: {
                title,
                exam,
                year,
                subject,
                type
            }
        },
        { returnDocument: "before" }
    );
    return sendResponce(res,
        200,
        true,
        "Update successfully",
        {
            data: update
        }
    );
}

export const updatePdf = asyncHelper(updatePdfApi);