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
        required: false,
        default: -1
    },
    email: {
        type: String,
        required: true
    },

    user_id: {
        type: String,
        required: true

    buy_date: {
        type: String,
        required: false,
        default: null
    },
    last_updated_date: {
        type: String,
        required: false,
        default: null

    }
    
    
});

export const Stock = mongoose.model('Stock', stockSchema);
