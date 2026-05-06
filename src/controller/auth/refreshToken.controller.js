import { user } from "../../models/user.models.js";
import JWT from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
//-------------------------------------------------------------------------------

async function refreshApi(req, res) {

    //get cookies clint
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) {
        return sendResponce(res,
            401,
            false,
            "Plesae login");
    };
    //verify refresh token 
    const decode = JWT.verify(
        refreshTokenCookie,
        process.env.REFRESH_SECRET
    );
    //find user id
    req.userId = decode.userId;
    const userId = req.userId;
    //find user id and token
    const userData = await user.findById(userId)
    if (!userData || !userData.refreshToken) {
        return sendResponce(
            res,
            401,
            false,
            "Authentication faile");
    };
    // compare token 
    const isMatch = await bcrypt.compare(refreshTokenCookie, userData.refreshToken);
    if (!isMatch) {
        return sendResponce(
            res,
            401,
            false,
            "Session expired, Please login again");
    };
    //Genrate new access token 
    const newAccessToken = JWT.sign(
        {
            userId: userData._id,
            role: userData.role
        },
        process.env.ASSCESS_SECRET,
        { expiresIn: "15m" }
    );
    //Refresh token ratation  new token genrate
    const newRefreshToken = JWT.sign(
        {
            userId: userData._id,
            role: userData.role
        },
        process.env.REFRESH_SECRET,
        { expiresIn: "15d" }
    );
    //convert new refresh token in hash
    const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    //filter upade  in db new token
    const filter = { _id: userId };
    const upadeObj = { $set: { refreshToken: newRefreshTokenHash } };
    //upate
    const refreshTokenUpade = await user.updateOne(filter, upadeObj);
    //set cookie
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        samesite: "lax"
    }).json({
        success: true,
        accessToken: newAccessToken,
        message: 'token refreshed successfully'

    })

}

export const refreshTokenApi = asyncHelper(refreshApi);