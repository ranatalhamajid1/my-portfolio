/**
 * Contact Message — Mongoose Schema
 */

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    subject: {
        type: String,
        trim: true,
        maxlength: [200, 'Subject cannot exceed 200 characters'],
        default: 'No Subject',
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
        type: String,
        enum: ['unread', 'read', 'replied'],
        default: 'unread',
    },
    ipAddress: {
        type: String,
        default: null,
    },
    userAgent: {
        type: String,
        default: null,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
});

// Index for faster queries
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);