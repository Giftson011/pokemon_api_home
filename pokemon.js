const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];

fetch('http://localhost:3000/api/pokemon?limit=151')
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data;
    displayPokemons(allPokemons);
  });

function displayPokemons(pokemons) {
  listWrapper.innerHTML = "";

  pokemons.forEach((pokemon) => {
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemon.id}</p>
        </div>
        <div class="img-wrap">
            <img src="${pokemon.image_url}" alt="${pokemon.name}" />
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">${pokemon.name}</p>
        </div>
    `;

    listItem.addEventListener("click", () => {
      window.location.href = `./detail.html?id=${pokemon.id}`;
    });

    listWrapper.appendChild(listItem);
  });
}

searchInput.addEventListener("keyup", () => {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.id.toString().startsWith(searchTerm)
    );
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );
  }

  displayPokemons(filteredPokemons);

  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
});
