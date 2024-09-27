const RegisterUser = require('../models/users');
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Replace with a strong secret key

router.post('/register', (req, res) => {
    RegisterUser.create(req.body)
    .then((user) => {
        return res.status(201).json({ message: 'Registration successful', user });
    })
    .catch((error) => {
        return res.status(500).json({ error: 'An error occurred while registering the user' });
    });
});

// User login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    RegisterUser.findOne({ email: email })
    .then((user) => {
        if (user) {
            if (user.password === password) {
                const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ message: 'Login successful', token: token });
            } else {
                res.status(401).json({ error: 'Incorrect password' });
            }
        } 
        else {
            res.status(404).json({ error: 'User not found' });
        }
    })
    .catch((error) => {
        return res.status(500).json({ error: 'An error occurred while logging in', details: error.message });
    });
});


module.exports = router;
