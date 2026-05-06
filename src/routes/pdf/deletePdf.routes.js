import express from "express";
import { deletePdf } from "../../controller/pdf/deletePdf.controller.js";
import { asyncHelper } from "../../utils/utils.asyncHandler.js";
import { verifyMeddleware } from "../../middlewares/verify-User.middlewares.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const deleteRoute = express.Router();
deleteRoute.delete("/:id",
    verifyMeddleware,
    authorizeRoles("admin"),
    asyncHelper(deletePdf)
);

export const deletePdfRoutes = deleteRoute;
