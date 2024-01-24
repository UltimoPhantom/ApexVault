import express from "express";
import { User } from "../modules/userModels.js";

const router = express.Router();

//Login
router.post('/login', async (req, res) => {
    res.json({mssg: 'Login User !! 🎊'})
})

//Signuo
router.post('/signup', async (req, res) => {
    const {email, password} = req.body
    try {  
        const user = await User.signup(email, password)

        res.status(200).json({email, user})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

})

export default router;
