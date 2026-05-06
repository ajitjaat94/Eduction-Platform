import { user } from "../../models/user.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";

async function verificationEmailApi(req, res) {
    const verifyToken = req.query.token;
    const verify = await user.findOne({ verifyToken });
    if (!verify) {
        return sendResponce(res, 404, false, "invalid verification token");
    }

    verify.isVerified = true;
    verify.verifyToken = null;
    await verify.save();

    return sendResponce(
        res,
        200,
        true,
        "email verified successfully, please login now");
}

export const verificationEmail = asyncHelper(verificationEmailApi);