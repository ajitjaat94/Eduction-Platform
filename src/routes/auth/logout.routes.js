import express from "express";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { logout } from "../../controller/auth/logout.controller.js";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";

const logoutUser = express.Router();

logoutUser.post("/logout",
    verifyMeddleware,
    asyncHelper(logout)
)
export const logutRoutes = logoutUser