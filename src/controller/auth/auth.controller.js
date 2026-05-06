import { user } from "../../models/user.models.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sendResponce } from "../../utils/utils.responce.js";
import crypto from "crypto";
import sibApiV3Sdk from "sib-api-v3-sdk";
import { trackActivity } from "../../utils/utils.trackActivity.js";

//--------------------------------------------------------------------------------------
//Sinup System
async function sinupApi(req, res) {

    const { username, email, password } = req.body
    const isExist = await user.findOne({ email });
    if (isExist) {
        return sendResponce(
            res,
            401,
            false,
            "if this email is registred already, please login,"
        )
    };

    //if user already exists but email is not verified 
    if (isExist.isVerified === false) {
        //new token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        //DB updatePd
        isExist.verifyToken = verificationToken
        await isExist.save();
        //Email send logic
        const client = sibApiV3Sdk.ApiClient.instance;//brevo main api client take
        const apiKey = client.authentications["api-key"];//prove authorize brevo
        apiKey.apiKey = process.env.BREVO_API_KEY;//first apiKey is variable, sencod apiKey is property
        const tranEmailApi = new sibApiV3Sdk.TransactionalEmailsApi()//emails send auto
        //send email 
        const verifyLink = ` https://project100-backend-education-software.onrender.com/api/v1/verify/email?token=${verificationToken}`;
        await tranEmailApi.sendTransacEmail({
            sender: {
                email: "ajitlife51@gmail.com",
                name: "Your App"
            },
            to: [
                {
                    email: isExist.email,
                    name: isExist.username
                }
            ],
            subject: "Verify your email",
            htmlContent: `
        <h2> Email verification </h2>
        <p> Click below to verify your email:</p>
        <a href="${verifyLink}"> Verify Email</a>`
        });


        return sendResponce(res, 401, false, "verification email resend")
    };
    //verification token Genrate random string 32 bits
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const hashpassword = await bcrypt.hash(password, 10);//salt rounds

    const userInfo = await user.create({
        verifyToken: verificationToken,
        isVerified: false,
        username,
        email,
        password: hashpassword
    });
    //Email send logic
    const client = sibApiV3Sdk.ApiClient.instance;//brevo main api client take
    const apiKey = client.authentications["api-key"];//prove authorize brevo
    apiKey.apiKey = process.env.BREVO_API_KEY;//first apiKey is variable, sencod apiKey is property
    const tranEmailApi = new sibApiV3Sdk.TransactionalEmailsApi()//emails send auto
    //send email 
    const verifyLink = ` https://project100-backend-education-software.onrender.com/api/v1/verify/email?token=${verificationToken}`;
    await tranEmailApi.sendTransacEmail({
        sender: {
            email: "ajitlife51@gmail.com",
            name: "Your App"
        },
        to: [
            {
                email: email,
                name: username
            }
        ],
        subject: "Verify your email",
        htmlContent: `
        <h2> Email verification </h2>
        <p> Click below to verify your email:</p>
        <a href="${verifyLink}"> Verify Email</a>`
    });

    return sendResponce(
        res,
        200,
        true,
        "sinup successfully");

};
//---------------------------------------------------------------------------------------
//Login System 
async function loginApi(req, res) {

    const { email, password } = req.body;
    const userData = await user.findOne({ email }).select("+password");
    if (!userData) {
        return sendResponce(
            res,
            401,
            false,
            "imvalid email or password")
    };
    //check isVerified
    if (!userData.isVerified) {
        return sendResponce(
            res,
            401,
            false,
            "please verify email")
    };

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
        return sendResponce(
            res,
            401,
            false,
            "invalid email or password");
    };
    //Token Genrate 
    const accessToken = JWT.sign(
        {
            userId: userData._id,
            role: userData.role
        },
        process.env.ASSCESS_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = JWT.sign(
        {
            userId: userData._id,
            role: userData.role
        },
        process.env.REFRESH_SECRET,
        { expiresIn: "15d" }
    );

    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);

    userData.refreshToken = hashRefreshToken;
    await userData.save();

    //tracking
    await trackActivity({
        userId: userData._id,
        action: "LOGIN"
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        samesite: "lax"
    }).json({
        success: true,
        message: 'login successfully',
        accessToken
    })
}

export const sinup = asyncHelper(sinupApi);
export const login = asyncHelper(loginApi);


