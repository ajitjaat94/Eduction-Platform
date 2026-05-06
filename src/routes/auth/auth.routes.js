import express from "express";
import { sinup, login } from "../../controller/auth/auth.controller.js"
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { sinupValidate } from "../../validations/auth/sinup.validation.js";
import { loginValidation } from "../../validations/auth/login.validation.js";
import {validatorMiddleware} from "../../middlewares/validation.middleware.js"


const authRout = express.Router();
authRout.post("/sinup",
    sinupValidate,
    validatorMiddleware,
    asyncHelper(sinup)
);

authRout.post("/login",
    loginValidation,
    validatorMiddleware,
    asyncHelper(login)
);

export const authRoutes = authRout;