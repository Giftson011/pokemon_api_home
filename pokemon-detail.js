let currentPokemonId = null;

document.addEventListener("DOMContentLoaded", () => {
  const pokemonID = new URLSearchParams(window.location.search).get("id");

  if (!pokemonID) {
    return (window.location.href = "./index.html");
  }

  currentPokemonId = parseInt(pokemonID, 10);
  loadPokemon(currentPokemonId);
});

async function loadPokemon(id) {
  try {
    // Fetch Pokémon details from your backend
    const response = await fetch(`http://localhost:3000/api/pokemon/${id}`);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const pokemon = await response.json();

    // Update the UI with Pokémon details
    displayPokemonDetails(pokemon);
    loadSimilarPokemon(pokemon);
    setupNavigation(id);
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    window.location.href = "./index.html";
  }
}

async function loadSimilarPokemon(pokemon) {
  const similarPokemonWrapper = document.querySelector(".similar-pokemon-wrapper");
  similarPokemonWrapper.innerHTML = ""; // Clear previous similar Pokémon

  const type = pokemon.type; // Type from the backend response
  if (!type) {
    console.error("Type is missing for the current Pokémon.");
    similarPokemonWrapper.innerHTML = "<p>No type found for this Pokémon.</p>";
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/pokemon?search=${type}&sort=name`);
    if (!response.ok) {
      throw new Error(`Failed to fetch similar Pokémon: ${response.statusText}`);
    }

    const similarPokemons = await response.json();
    console.log("Fetched similar Pokémon data:", similarPokemons);

    similarPokemons
      .filter((item) => item.id !== pokemon.id && item.image_url)
      .slice(0, 3)
      .forEach((item) => {
        const pokemonDiv = document.createElement("div");
        pokemonDiv.className = "similar-pokemon-card";
        pokemonDiv.innerHTML = `
          <img src="${item.image_url}" alt="${item.name}" />
          <p>${item.name}</p>
        `;
        similarPokemonWrapper.appendChild(pokemonDiv);
      });

    // If no Pokémon were appended
    if (similarPokemonWrapper.children.length === 0) {
      similarPokemonWrapper.innerHTML = "<p>No similar Pokémon found.</p>";
    }
  } catch (error) {
    console.error("Error fetching similar Pokémon:", error);
    similarPokemonWrapper.innerHTML = "<p>Unable to load similar Pokémon.</p>";
  }
}



function setupNavigation(id) {
  const leftArrow = document.querySelector("#leftArrow");
  const rightArrow = document.querySelector("#rightArrow");

  leftArrow.style.display = id > 1 ? "block" : "none";
  rightArrow.style.display = id < 151 ? "block" : "none";

  if (id > 1) {
    leftArrow.addEventListener("click", () => navigatePokemon(id - 1));
  }
  if (id < 151) {
    rightArrow.addEventListener("click", () => navigatePokemon(id + 1));
  }
}

async function navigatePokemon(id) {
  currentPokemonId = id;
  await loadPokemon(id);
}

function displayPokemonDetails(pokemon) {
  const { id, name, type, weight, height, image_url } = pokemon;

  document.querySelector("title").textContent = name;

  document.querySelector(".name-wrap .name").textContent = name;
  document.querySelector(".pokemon-id-wrap .body2-fonts").textContent = `#${String(id).padStart(3, "0")}`;

  const imageElement = document.querySelector(".detail-img-wrapper img");
  imageElement.src = image_url;
  imageElement.alt = name;

  const typeWrapper = document.querySelector(".power-wrapper");
  typeWrapper.innerHTML = `<p class="body3-fonts type ${type}">${type}</p>`;

  document.querySelector(".pokemon-detail-wrap .pokemon-detail p.weight").textContent = `${weight}kg`;
  document.querySelector(".pokemon-detail-wrap .pokemon-detail p.height").textContent = `${height}m`;

  // Clear previous abilities
  const abilitiesWrapper = document.querySelector(".pokemon-detail-wrap .pokemon-detail.move");
  abilitiesWrapper.innerHTML = `<p class="body3-fonts">${type}</p>`; // Use the Pokémon type as a placeholder
  setTypeBackgroundColor(type);
}
const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  dark: "#EE99AC",
};

function setTypeBackgroundColor(type) {
  const color = typeColors[type];
  if (!color) return;

  document.querySelector(".detail-main").style.backgroundColor = color;
}
