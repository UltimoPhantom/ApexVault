import express from "express";
import { User } from "../modules/userModels.js";
import jwt from 'jsonwebtoken';
import { jwt_sign }from '../config.js'
import axios from 'axios';
import { aws_api_peruser } from "../config.js";

const createToken = (_id) => {
    return jwt.sign({_id}, jwt_sign, { expiresIn: '7d' })
}

const router = express.Router();

//Login
router.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch(e) {
        res.status(400).json({error: e.message})
    }
})

//Signup
router.post('/signup', async (req, res) => {
    const {email, password} = req.body
    try {  
        const user = await User.signup(email, password)
        
        //creating a token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
})


router.post('/getStocks', async (req, res) => {
    const { email } = req.body;
    try {
        const response = await axios.post(aws_api_peruser , {
            email: email
        });
        
        console.log("🐸🐸 ", response.data);
        res.status(200).json({
          investedVal: response.data.investedVal,
          currentVal: response.data.currentVal,
        });
        
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
