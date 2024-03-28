import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const s = new Schema;

export const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    last_updated: {
        type: String
    },
    coins: {
        type: Number,
        default: 100
    }
});

//static signup method
userSchema.statics.signup = async function(email, password) {
    if(!email || !password)
        throw Error('Email or password is empty')

    if(!validator.isEmail(email))
        throw Error('Email not valid')
    if(password.length < 7)
        throw Error('Password too small')


    const exists = await this.findOne({ email })
    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)
    const now = new Date();

    const user = await this.create({ email, password: hash, last_updated: "-1", coins: 100 })

    return user
}

//static login method
userSchema.statics.login = async function (email, password) {
    if(!email || !password)
        throw Error("Email or password is empty")

    const user = await this.findOne({ email })
    if(!user)
        throw Error("Incorrect email")
    
    const match = await bcrypt.compare(password, user.password)
    if(!match)
        throw Error('Incorrect password')

    return user
}

export const User = mongoose.model('User', userSchema);
