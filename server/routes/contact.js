const express = require('express');
const router = express.Router();
const { pool } = require('../db');

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  if (!emailRe.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    await pool.query(
      `INSERT INTO inquiries (type, name, email, phone, message)
       VALUES ('contact', $1, $2, $3, $4)`,
      [name.trim(), email.trim(), phone?.trim() || null, message.trim()]
    );
    res.json({ ok: true, message: "Message received! We'll be in touch soon." });
  } catch (err) {
    console.error('Contact insert error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
