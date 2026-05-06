import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    exam: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    option: {
        type: [{
            text: {
                type: String,
                required: true
            }
        }],
        required: true
    },
    correctOption: {
        type: Number,
        required: true
    }

},
    { timestamps: true }
);
export const questions = mongoose.model('questions', questionSchema);

