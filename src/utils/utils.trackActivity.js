import { userActivity } from "../models/userActivity.models.js";

export const trackActivity = async (data) => {
    try {
        const { userId, action, exam, subject, year, PdfId } = data;
        const activityData = {
            action
        };
        if (userId) activityData.userId = userId;
        if (exam) activityData.exam = exam;
        if (subject) activityData.subject = subject;
        if (year) activityData.year = year;
        if (PdfId) activityData.PdfId = PdfId;

        await userActivity.create(activityData);
    } catch (error) {
        console.log("tracking error:", error.message)
    }
}