const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
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

  if (qtRecords >= maxRecords) {
    nextPageButton.style.display = 'none';
  }

  loadPokemonItens(offset, limit);
});