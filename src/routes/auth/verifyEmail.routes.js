import express from "express";
import { verificationEmail } from "../../controller/auth/verifyEmailController.js";

const verification = express.Router();
verification.get("/email",
    verificationEmail
);

export const verificationRout = verification;