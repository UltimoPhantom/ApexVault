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

//Get all Stocks
app.get('/stocks', async (req, res) => {
    try {
        const stock = await Stock.find({})
        console.log(stock);
        console.log(typeof(stock));
        return res.status(200).send(stock)
    }
    catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

//Get one stock
app.get('/stocks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await Stock.findById(id)
        console.log(stock);
        return res.status(200).send(stock)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

//Updating
app.put('/stocks/:id', async (req, res) => {
    try {
        const { id } = req.params 
        const result = await Stock.findByIdAndUpdate(id, req.body);
        console.log("Req body: ", req.body)

        res.status(200).send({ message: "Stock updated successfully! "})
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

//Delete One
app.delete('/stocks/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Stock.findByIdAndDelete(id)
        res.status(200).send({ message: "Deleted! "})

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

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