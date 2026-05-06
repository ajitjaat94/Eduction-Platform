import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "questions",
            required: true
        }
    ],
    status: {
        type: String,
        enum: ["ongoing", "completed"],
        defoult: "ongoing"
    },
    //answer store 
    answers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "questions",
                required: true,
            },
            selectOption: Number,
            isCorrect: Boolean
        }
    ]


},
    { timestamps: true }
);

export const practiceSession = mongoose.model('practiceSession', sessionSchema);
