import { pdf } from "../../models/pdf.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js"
import { sendResponce } from "../../utils/utils.responce.js";
import { uploadToCloudinary } from "../../utils/utils.cloudinaryUpload.js";

async function updoadPdf(req, res) {
    //Upload data 
    const { title, exam, year, subject, type } = req.body;
    const pdfFile = req.files.file[0];
    const thumbnailFile = req.files.thumbnail[0];
    if (!pdfFile || !thumbnailFile) {
        return sendResponce(res, 400, false, "PDF and Thumbnail is required");
    };
    //file process 
    const pdfUpload = await uploadToCloudinary(pdfFile.buffer, "pdfs");
    const thumbnailUpload = await uploadToCloudinary(thumbnailFile.buffer, "thumbnails");
    //Get URl and id
    const pdfUrl = pdfUpload.secure_url;
    const pdfPublicId = pdfUpload.public_id;
    const thumbnailUrl = thumbnailUpload.secure_url;
    const thumbnailPublicId = thumbnailUpload.public_id;

    const newPdf = await pdf.create({
        title,
        exam,
        year,
        subject,
        type,
        pdfUrl,
        pdfPublicId,
        thumbnailUrl,
        thumbnailPublicId
    });
    return sendResponce(res, 201, true,
        "PDF uploaded successfully",
        { data: newPdf }
    )
};

export const adminUploadPdf = asyncHelper(updoadPdf);
