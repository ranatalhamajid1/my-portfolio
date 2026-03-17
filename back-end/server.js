/**
 * ============================================================
 * PORTFOLIO BACKEND — Express + MongoDB
 * Author: Rana Muhammad Talha Majid
 * ============================================================
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====

// CORS — allow all origins in dev, restrict in production
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.ALLOWED_ORIGIN || '*'
        : '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// Parse JSON bodies
app.use(express.json({ limit: '1mb' }));

// Basic request logging
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// ===== RATE LIMITER (for contact endpoint) =====
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 requests per window per IP
    message: {
        success: false,
        message: 'Too many messages sent. Please try again in 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// ===== ROUTES =====

// API routes
app.use('/api', contactRoutes);

// Apply rate limiter specifically to POST contact
app.use('/api/contact', contactLimiter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Portfolio API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
});

// Serve frontend for all other routes (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
    console.error('❌ Unhandled error:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
});

// ===== DATABASE CONNECTION & SERVER START =====
async function startServer() {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
            console.log(`📁 Serving frontend from: ${path.join(__dirname, '../frontend')}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

// ===== GRACEFUL SHUTDOWN =====
async function gracefulShutdown(signal) {
    console.log(`\n🔄 ${signal} received. Shutting down gracefully...`);
    try {
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed');
    } catch (err) {
        console.error('❌ Error closing MongoDB:', err.message);
    }
    process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start the server
startServer();