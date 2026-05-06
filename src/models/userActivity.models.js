import mongoose, { Types } from "mongoose";
const trackingUser = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,

    },
    action: {
        type: String,
        required: true
    },
    exam: {
        type: String,
    },
    subject: {
        type: String,
    },
    year: {
        type: Number,
    },
    pdfId: {
        type: mongoose.Schema.Types.ObjectId
    },
},
    { timestamps: true }
);

export const userActivity = mongoose.model('userActivity', trackingUser);