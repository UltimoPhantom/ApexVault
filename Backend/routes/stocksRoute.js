import express from "express";
import { Stock } from "../modules/stockModels.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth)

// Route to save new stocks
router.post('/', async (req, res) => {
    try {
        const { name, price, quantity, LTP, email } = req.body;

        if (!name || !price) {
            return res.status(400).send({ message: "Name and price are required fields." });
        }
        if(!quantity)
            return res.status(400).send({ message: "Quantity are required fields." });


        const newStock = {
            name: name,
            price: price,
            quantity: quantity,
            LTP: LTP,
            email: email
        };

        const stock = await Stock.create(newStock);
        return res.status(201).send(stock);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// Get all Stocks
router.get('/', async (req, res) => {
    try {
        const { email } = req.query;
        console.log("Email: ", email);
        const stock = await Stock.find({ email: email }); 
        console.log("ASASA");
        console.log(stock);
        return res.status(200).send(stock);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});


// Get one stock
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await Stock.findById(id);
        console.log(stock);
        return res.status(200).send(stock);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// Updating
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Stock.findByIdAndUpdate(id, req.body);
        console.log("Req body: ", req.body);

        res.status(200).send({ message: "Stock updated successfully! " });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// Delete One
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Stock.findByIdAndDelete(id);
        res.status(200).send({ message: "Deleted! " });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

export default router;
