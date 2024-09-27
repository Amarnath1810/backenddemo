const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    username: { type: String, required: false }, 
    email: { type: String, required: true },    
    password: { type: String, required: true } 
});

const UsersRegister = mongoose.model('userregister', RegisterSchema);
module.exports = UsersRegister;
