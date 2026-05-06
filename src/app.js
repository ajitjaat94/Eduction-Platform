import express from "express"
import globelErrorHandler from "./middlewares/globelErrorHendler.middlewares.js";
import cookieParser from "cookie-parser";
//auth import
import { authRoutes } from "./routes/auth/auth.routes.js"
import { refreshRoutes } from "./routes/auth/refreshToken.routes.js";
import { profileRoutes } from "./routes/profile.routes.js";
import { logutRoutes } from "./routes/auth/logout.routes.js";
import { verificationRout } from "./routes/auth/verifyEmail.routes.js";
// User Question import
import { questionRout } from "./routes/question/question.routes.js";
import { questionByIndex } from "./routes/question/getQuestionByIndex.routes.js";
import { submitRout } from "./routes/question/submitQuestion.routes.js";
import { resultRout } from "./routes/question/result.rout.js";
//Admin Question import
import { adminQuestionRoute } from "./routes/question/adminQuestionUpload.routes.js";
import { adminUpdateQuestion } from "./routes/question/adminQuestionUpdate.routes.js";
import { adminReadQuestionRoute } from "./routes/question/adminReadQuestion.routes.js";
import { adminQuestionDeleteRoute } from "./routes/question/adminQuestionDelete.routes.js";
//PDF Routes
import { adminUploadPdfRoute } from "./routes/pdf/upload.routes.js";
import { getAllPdfsRoute } from "./routes/pdf/getPdf.routes.js";
import { deletePdfRoutes } from "./routes/pdf/deletePdf.routes.js";
import { updatePdfRoute } from "./routes/pdf/updatePdf.routes.js";


//--------------------------------------------------------------------------------
const app = express();

//--------------------------------------------------------------------------------
app.use(cookieParser());
app.use(express.json());
//Auth Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/refresh", refreshRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/logout", logutRoutes);
app.use("/api/v1/verify", verificationRout);

//User question Routes
app.use("/api/v1/question", questionRout);
app.use("/api/v1/question", questionByIndex);
app.use("/api/v1/question", submitRout);
app.use("/api/v1/question", resultRout);

//Admin question Routes
app.use("/api/v1/question/admin", adminQuestionRoute);
app.use("/api/v1/question/admin", adminUpdateQuestion);
app.use("/api/v1/question/admin", adminReadQuestionRoute);
app.use("/api/v1/question/admin", adminQuestionDeleteRoute);

//PDF Routes 
app.use("/api/v1/pdf", adminUploadPdfRoute);
app.use("/api/v1/pdf", getAllPdfsRoute);
app.use("/api/v1/pdf", deletePdfRoutes);
app.use("/api/v1/pdf", updatePdfRoute);

//GlobelError hendeler
app.use(globelErrorHandler);
//---------------------------------------------------------------------------------
export default app;