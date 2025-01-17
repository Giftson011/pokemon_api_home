const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;
const cors = require('cors');
// PostgreSQL Configuration
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'pokemon_db',
  password: 'g0dje5u5', // Replace with your PostgreSQL password
  port: 5432,
});

app.use(cors());

// Middleware
app.use(express.json());

// Get all Pokémon with optional search and sort
app.get('/api/pokemon', async (req, res) => {
  const { search, sort } = req.query;
  const searchCondition = search ? `WHERE name ILIKE $1` : '';
  const sortCondition = sort === 'name' ? 'ORDER BY name' : 'ORDER BY id';

  try {
    const query = `
      SELECT id, name, weight, height, type, image_url
      FROM pokemon
      ${searchCondition}
      ${sortCondition}
    `;
    const values = search ? [`%${search}%`] : [];
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Pokémon by ID
app.get('/api/pokemon/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM pokemon WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
