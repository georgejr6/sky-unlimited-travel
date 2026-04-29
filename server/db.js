const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      type VARCHAR(20) NOT NULL DEFAULT 'contact',
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      message TEXT,
      destination VARCHAR(255),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  console.log('Database ready');
}

module.exports = { pool, initDb };
