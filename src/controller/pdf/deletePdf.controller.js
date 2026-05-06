import { pdf } from "../../models/pdf.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
import { cloudinaryConfig } from "../../config/cloudinary.config.js";
//------------------------------------------------------------------------------------
async function deletePdfApi(req, res) {
    //step:1
    const { id } = req.params;
    const pdfDoc = await pdf.findById(id);
    if (!pdfDoc) {
        return sendResponce(res, 404, false, "pdf not found");
    };
    //step:2 - delete pdf&image 
    const publicId = pdfDoc.pdfPublicId;
    const thumbnailId = pdfDoc.thumbnailPublicId;
    //pdf delete in cloudinary
    await cloudinaryConfig.uploader.destroy(publicId, { resource_type: "raw" });
    //thumbnail delete in cloudinary
    await cloudinaryConfig.uploader.destroy(thumbnailId, { resource_type: "image" });
    //step:3
    await pdf.findByIdAndDelete(id);
    return sendResponce(res,
        200,
        true,
        "Delete successfully"
    );
}
export const deletePdf = asyncHelper(deletePdfApi);