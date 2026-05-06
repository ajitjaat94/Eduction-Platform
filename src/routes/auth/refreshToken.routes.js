import express from "express"
import { refreshTokenApi } from "../../controller/auth/refreshToken.controller.js"
import { asyncHelper } from "../../utils/utils.asyncHandler.js"

const refresh = express.Router()
refresh.post("/refresh",
    asyncHelper(refreshTokenApi)
);

export const refreshRoutes = refresh;

//refresh token route