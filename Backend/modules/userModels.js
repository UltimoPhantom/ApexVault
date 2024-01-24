const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//Static signup methods
userSchema.statics.signup = async function (email, password) {

    //VAlidating EMail and password
    if(!validator.isEmail(email)) 
        throw Error('Invalid Email!')    
    if(!validator.isStrongPassword(password))
        throw Error('Password must contain Uppercase, symbol, number!')
    
    const exist = await this.findOne({ email })
    console.log("Email: ",email)
    console.log("Password: ",password)

    if(exist) {
        throw Error('Email already in use!!')
    }

    const salt = await bcrypt.genSalt(10)
    console.log("Salt value: ",salt)
    
    const hash = await bcrypt.hash(password, salt)
    console.log("Hash value: ",hash)

    const user = await this.create({ email, password: hash })    
    return user
}

//Login static method
    userSchema.statics.login = async function(email, password) {
        if(!email || !password)
            throw Error('Email or Password is empty!')
        
        const user = await this.findOne({ email })
        if(!user)
            throw Error('Email dosen\'t exist!')

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
            throw Error('Incorrect Password!')

        return user
    }

module.exports = mongoose.model('User', userSchema)