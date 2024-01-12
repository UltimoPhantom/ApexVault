// main file
import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbURl } from './config.js';
import { Stock } from "./modules/stockModels.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(202).send();
});

// Route to save new stocks
app.post('/stocks', async (req, res) => {
    try {
        const newStock = {
            name: req.body.name,
            price: req.body.price
        };
        console.log(req.body.name);
        console.log(req.body.price);
        const stock = await Stock.create(newStock);
        return res.status(201).send(stock);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

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
