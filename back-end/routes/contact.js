/**
 * Contact API Routes
 */

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

/**
 * POST /api/contact
 * Submit a new contact message
 */
router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // --- Server-side validation ---
        const errors = [];

        if (!name || !name.trim()) {
            errors.push('Name is required');
        } else if (name.trim().length > 100) {
            errors.push('Name must be under 100 characters');
        }

        if (!email || !email.trim()) {
            errors.push('Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            errors.push('Please provide a valid email address');
        }

        if (!message || !message.trim()) {
            errors.push('Message is required');
        } else if (message.trim().length > 2000) {
            errors.push('Message must be under 2000 characters');
        }

        if (subject && subject.trim().length > 200) {
            errors.push('Subject must be under 200 characters');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: errors.join('. '),
                errors,
            });
        }

        // --- Save to database ---
        const contact = new Contact({
            name: name.trim(),
            email: email.trim(),
            subject: subject ? subject.trim() : 'No Subject',
            message: message.trim(),
            ipAddress: req.ip || req.headers['x-forwarded-for'] || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown',
        });

        await contact.save();

        console.log(`📩 New contact message from: ${name} (${email})`);

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! I will get back to you soon.',
        });

    } catch (error) {
        console.error('❌ Error saving contact message:', error.message);

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: messages.join('. '),
                errors: messages,
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later or email directly.',
        });
    }
});

/**
 * GET /api/contacts
 * Retrieve all contact messages (basic admin — no auth for now)
 */
router.get('/contacts', async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        // Build filter
        const filter = {};
        if (status && ['unread', 'read', 'replied'].includes(status)) {
            filter.status = status;
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [contacts, total] = await Promise.all([
            Contact.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            Contact.countDocuments(filter),
        ]);

        res.json({
            success: true,
            data: contacts,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit)),
            },
        });

    } catch (error) {
        console.error('❌ Error fetching contacts:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact messages.',
        });
    }
});

/**
 * PATCH /api/contacts/:id/status
 * Update a contact message status
 */
router.patch('/contacts/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['unread', 'read', 'replied'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be: unread, read, or replied.',
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found.',
            });
        }

        res.json({
            success: true,
            message: `Status updated to "${status}"`,
            data: contact,
        });

    } catch (error) {
        console.error('❌ Error updating contact status:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to update contact status.',
        });
    }
});

/**
 * DELETE /api/contacts/:id
 * Delete a contact message
 */
router.delete('/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found.',
            });
        }

        res.json({
            success: true,
            message: 'Contact message deleted successfully.',
        });

    } catch (error) {
        console.error('❌ Error deleting contact:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact message.',
        });
    }
});

module.exports = router;