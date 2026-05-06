import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    exam: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    pdfUrl: {
        type: String,
        required: true
    },
    pdfPublicId: {
        type: String
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    thumbnailPublicId: {
        type: String
    },
},
    { timestamps: true }
);

export const pdf = mongoose.model("pdf", pdfSchema)