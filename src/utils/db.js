const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000, // 10s
});

// Helper method to log errors / wrap queries cleanly
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
