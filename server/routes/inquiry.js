const express = require('express');
const router = express.Router();
const { pool } = require('../db');

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res) => {
  const { name, email, phone, destination } = req.body;

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  if (!emailRe.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    await pool.query(
      `INSERT INTO inquiries (type, name, email, phone, destination)
       VALUES ('booking', $1, $2, $3, $4)`,
      [name.trim(), email.trim(), phone?.trim() || null, destination?.trim() || null]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error('Inquiry insert error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
