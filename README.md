# Pokémon Database Application

## i. Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **API**: PokéAPI

### Additional Libraries:
- `pg` for PostgreSQL connection
- `node-fetch` for API requests
- `cors` for enabling CORS support

## ii. Pre-requisite (for the app to run locally)

- **Node.js**: Ensure you have Node.js installed. Download from [Node.js official website](https://nodejs.org/).
- **PostgreSQL**: Install and set up PostgreSQL. Create a database named `pokemon_db`.

### Environment Setup:
- Update PostgreSQL connection details (username, password, host, etc.) in the `populate_database.js` and `server.js` files.
- **Dependencies**: Run `npm install` in the project directory to install all necessary packages.

## iii. Migration & Seed Database Steps

### 1. Create the pokemon table in your PostgreSQL database:

```sql
CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    weight FLOAT NOT NULL,
    height FLOAT NOT NULL,
    type VARCHAR(255) NOT NULL,
    image_url TEXT
);
```
