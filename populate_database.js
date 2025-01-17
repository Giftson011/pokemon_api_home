const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args)); // Import node-fetch dynamically

const { Pool } = require('pg');

// PostgreSQL Configuration
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'pokemon_db',
  password: 'g0dje5u5', // Replace with your PostgreSQL password
  port: 5432,
});

const MAX_POKEMON = 151;

(async () => {
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`);
      const data = await response.json();

      for (const pokemon of data.results) {
          const id = pokemon.url.split('/')[6];
          const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const detail = await detailResponse.json();

          await pool.query(
              'INSERT INTO pokemon (id, name, weight, height, type, image_url) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
              [
                  id,
                  detail.name,
                  detail.weight / 10, // Convert to kilograms
                  detail.height / 10, // Convert to meters
                  detail.types[0]?.type.name || 'unknown',
                  detail.sprites.front_default,
              ]
          );
          console.log(`Saved Pokémon: ${detail.name}`);
      }

      console.log('All Pokémon data has been saved.');
      process.exit(0);
  } catch (error) {
      console.error('Error populating database:', error);
      process.exit(1);
  }
})();
