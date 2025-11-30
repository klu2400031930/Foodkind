const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true, // Allows null/undefined values to not conflict
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['donor', 'receiver', 'volunteer', 'ngo'],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    profilePhoto: {
        type: String, // URL or path to photo
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    },
    loginHistory: [{
        type: Date,
    }],
});

module.exports = mongoose.model('User', userSchema);
