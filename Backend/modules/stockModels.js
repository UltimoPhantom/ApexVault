// modules/stockModels.js
import mongoose from "mongoose";

export const stockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    LTP: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

export const Stock = mongoose.model('Stock', stockSchema);
