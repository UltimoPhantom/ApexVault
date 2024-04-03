import jwt from 'jsonwebtoken';
import { jwt_sign }from '../config.js'
import { User } from "../modules/userModels.js";

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({ error: 'Auth token required!' })
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, jwt_sign)

        req.userEmail = (await User.findOne({ _id }).select('email')).email;

        next()
    }
    catch(error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

export default requireAuth