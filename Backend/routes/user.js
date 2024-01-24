import express from "express";

const router = express.Router();

//Login
router.post('/login', async (req, res) => {
    res.json({mssg: 'Login User !! 🎊'})
})

//Signuo
router.post('/signup', async (req, res) => {
    res.json({mssg: 'Signup User !! 🎊''})
})

export default router;
