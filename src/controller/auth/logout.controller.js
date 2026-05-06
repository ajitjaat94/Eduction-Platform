import { user } from "../../models/user.models.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
//----------------------------------------------------------------------------------
async function logoutApi(req, res) {
    // Get refreshToken in cookies
    const refreshTokencookie = req.cookies.refreshToken;
    if (!refreshTokencookie) {
        return sendResponce(
            res,
            200,
            true,
            "Logged out successfully");
    };
    //verify refreshToken using secret key
    const decode = JWT.verify(
        refreshTokencookie,
        process.env.REFRESH_SECRET
    );
    //find user Id in db
    const userData = await user.findById(decode.userId);
    if (!userData || !userData.refreshToken) {
        return sendResponce(
            res,
            200,
            true,
            "Logged out successfully")
    };
    //check refreshToken 
    const isMatch = await bcrypt.compare(refreshTokencookie, userData.refreshToken)
    if (isMatch) {
        userData.refreshToken = null;
        await userData.save();
    };
    // delete refreshToken in cookies 
    res.clearCookie('refreshToken', {
        httpOnly: true,
        samesite: "strict"
    });

    return sendResponce(
        res,
        200,
        true,
        "Logged out successfully");
};

export const logout = asyncHelper(logoutApi);