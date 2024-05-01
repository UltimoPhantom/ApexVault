import express from "express";
import { Stock } from "../modules/stockModels.js";
import requireAuth from "../middleware/requireAuth.js";
import { User } from "../modules/userModels.js";
import axios from "axios"; // Import Axios

const router = express.Router();

router.use(requireAuth)

router.post('/histdata', async (req, res) => {
    try {
        const { stockName, start_date, end_date } = req.body;
        
        const response = await axios.post('http://127.0.0.1:5000/histdata', {
            stockName: stockName,
            start_date: start_date,
            end_date: end_date
        });

        const responseData = response.data;
        console.log("RES RES: ", responseData)

        // Return the data received from the external API
        return res.status(200).send(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});


// Route to save new stocks
router.post('/', async (req, res) => {
    try {
        const { name, price, quantity, LTP, email } = req.body;

        if (!name || !price) {
            return res.status(400).send({ message: "Name and price are required fields." });
        }
        if(!quantity)
            return res.status(400).send({ message: "Quantity are required fields." });

        //buy date set
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();

        const toDay = day + " " + month + " " + year;

        const newStock = {
            name: name,
            price: price,
            quantity: quantity,
            LTP: LTP,
            email: email,
            buy_date: toDay
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
        const email = req.userEmail;

        const stock = await Stock.find({ email: email });

        var user = await User.find({ email: email }) 
        user = user[0];

        const last_updated = user.last_updated;

        const coins = user.coins;
        
        return res.status(200).send({ stock: stock, last_updated: last_updated, coins: coins });
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


router.post('/histdata', async (req, res) => {
    try {
        const { stockName, start_date, end_date } = req.body;
        
        const response = await axios.post('http://127.0.0.1:5000/histdata', {
            stockName: stockName,
            start_date: start_date,
            end_date: end_date
        });

        const responseData = response.data;
        console.log("RES RES: ", responseData)

        // Return the data received from the external API
        return res.status(200).send(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});
export default router;
