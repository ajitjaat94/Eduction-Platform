import { user } from "../../models/user.models.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
//-------------------------------------------------------------------------------------
async function userProfile(req, res) {

    const userData = await user.findById(req.user.userId);
    if (!userData) {
        return sendResponce(
            res,
            401,
            false,
            "please login to access your profile");
    };

    return sendResponce(
        res,
        200,
        true,
        "profile",
        {
            usernamer: userData.username,
            email: userData.email
        }
    );
};

//--------------------------------------------------------------------------------------
//profile Upade Api

async function upadeProfile(req, res) {

    const { username } = req.body;
    if (!username) {
        return sendResponce(
            res,
            400,
            false,
            "Username is required");
    };
    const userId = req.user.userId
    const filter = { _id: userId };
    const upadeOdj = { $set: { username } }
    const userData = await user.findOneAndUpdate(filter, upadeOdj, { new: true });
    if (!userData) {
        throw new Error("somthing went wrong while upadating profile")
    };

    return sendResponce(
        res,
        200,
        true,
        "Profile upade successfully",
        {
            username: userData.username,
            email: userData.email
        }
    );
};

export const userProfileController = asyncHelper(userProfile)
export const upadeProfileController = asyncHelper(upadeProfile)