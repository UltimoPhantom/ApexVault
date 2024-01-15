import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbUR2, mongodbURl } from './config.js';
import { Stock } from "./modules/stockModels.js";
import stocksRoute from './routes/stocksRoute.js'; // Corrected import path
import cors from 'cors'

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(202).send();
});

app.use('/stocks', stocksRoute);

mongoose
    .connect(mongodbURl)
    .then(() => {
        console.log("Connected to DB!");

        app.listen(PORT, () => {
            console.log("Hello World");
        });
    })
    .catch((error) => {
        console.log(error);
    });
