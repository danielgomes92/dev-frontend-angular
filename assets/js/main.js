const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const nextPageButton = document.getElementById('nextPageButton');
const maxRecords = 151;
const limit = 20;
let offset = 0;

function convertPokemonToHTML(pokemon) {
  return `<li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.id}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
            <ol class="types">
              ${pokemon.types
                .map(type => `<li class="type ${type}">${type}</li>`)
                .join('')}
            </ol>
            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
            />
          </div>
        </li>`;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const pokemonsHTML = pokemons.map(convertPokemonToHTML).join('')
    pokemonList.innerHTML += pokemonsHTML;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtRecords = offset + limit;

  if (qtRecords >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }

  loadPokemonItens(offset, limit);
});

nextPageButton.parentElement.removeChild(nextPageButton);
