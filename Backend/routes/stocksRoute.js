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

        let coins = 0;
        let totalCoins = 0;
        for (const s of stock) {
            coins += s.price * s.quantity
            totalCoins += s.LTP * s.quantity;
        }

            console.log("COINS: ", coins)
            console.log("TOTAL: ", totalCoins)
        return res.status(200).send({ stock: stock, last_updated: last_updated, coins: coins, totalCoins: totalCoins });
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
// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await Stock.findByIdAndDelete(id);
//         res.status(200).send({ message: "Deleted! " });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: error.message });
//     }
// });

router.delete('/:stockName', async (req, res) => {
    try {
        const { stockName } = req.params;

        // Find the user by email
        const user = await User.findOne({});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the index of the stock with the given name
        const index = user.stocks.findIndex(stock => stock.name === stockName);

        if (index === -1) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        // Remove the stock from the user's stocks array
        user.stocks.splice(index, 1);

        // Save the updated user document
        await user.save();

        return res.status(200).json({ message: 'Stock removed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
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
