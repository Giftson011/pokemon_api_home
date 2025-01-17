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
### 2. Populate the database with Pokémon data:
- Run the `populate_database.js` script:
```node populate_database.js ```
- This script fetches Pokémon data from the PokéAPI and populates the `pokemon` table.

## iv. Running the App

### 1. Start the Backend Server:

- Navigate to the project directory and run:
```node server.js```
- The server will start on `http://localhost:3000`.

### 2. View the Frontend:

- Open `index.html` in your browser to access the application.

### 3. Explore the API:

- Fetch all Pokémon: `GET /api/pokemon`
- Search Pokémon by name or type: `GET /api/pokemon?search=<query>`
- Fetch Pokémon by ID: `GET /api/pokemon/:id`
