const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // npm install bcryptjs

// we are defining what an user object is in userSchema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // if this value is not present, the entry wont be stored inside the database and it would throw an error
    },
    email: {
        type: String,
        required: true,
        unique: true // if a duplicate email comes to the database for storing or updating, it will throw an error
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Student', 'Teacher'] // if I pass any value inside the role other than Admin, Student or Teacher, it will throw an error
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

// Write a function that encrypts the password before saving it inside the database
userSchema.pre('save', async function (next)    {
    // call this function to do the operation of encrypting my password before saving it inside the database
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // acts as a middleware
})

// Write a function that decrypts my password while comparing. Basically compares the value of user actual password against its encrypted password stored in the database
userSchema.methods.matchPassword = async function (enteredPassword) { // enteredpassword is coming from request body

    console.log("enteredPassword", enteredPassword);
    return await bcrypt.compare(enteredPassword, this.password)
}

// User is a mongodb collection
const User = mongoose.model('User', userSchema)

// export the user object
module.exports = User;