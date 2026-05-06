import express from "express";
import { userProfileController, upadeProfileController } from "../controller/auth/profile.controler.js";
import { verifyMeddleware } from "../middlewares/verify-User.middlewares.js";
import { asyncHelper } from "../utils/utils.asyncHandler.js";
import { profileValidation } from "../validations/profile.validation.js";
import {validatorMiddleware} from "../middlewares/validation.middleware.js"

const profile = express.Router();

profile.get("/profile",
    verifyMeddleware,
    asyncHelper(userProfileController)
);

profile.patch("/upade",
    verifyMeddleware,
    profileValidation,
    validatorMiddleware,
    asyncHelper(upadeProfileController)
)

export const profileRoutes = profile;