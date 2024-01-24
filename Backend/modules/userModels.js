import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

export const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

//static signup method
userSchema.statics.signup = async function(email, password) {
    console.log("***", email, password)
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

    const user = await this.create({ email, password: hash })

    return user
}

export const User = mongoose.model('User', userSchema);
