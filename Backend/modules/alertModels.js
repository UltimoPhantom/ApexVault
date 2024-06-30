import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    stockName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    LTP: {
        type: Number,
        required: false,
        default: -1
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
});

export const Alert = mongoose.model('Alert', alertSchema);