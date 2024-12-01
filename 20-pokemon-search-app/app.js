const apiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const imgContainer = document.getElementById("img-container");
const types = document.getElementById("types");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

function renderTypes(types) {
  return types
    .map((item) => {
      const name = item.type.name;
      return `<span class="type ${name}">${name.toUpperCase()}</span>`;
    })
    .join(" ");
}

function showPokemon(data) {
  // set info
  pokemonName.textContent = `${data.name.toUpperCase()}`;
  pokemonID.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;
  imgContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;

  // set types
  types.innerHTML = `${renderTypes(data.types)}`;

  //set stats
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
}

function resetDisplay() {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  // reset stats
  pokemonName.textContent = "";
  pokemonID.textContent = "";
  types.innerHTML = "";
  height.textContent = "";
  weight.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
}
async function fetchData() {
  const valueInput = searchInput.value.trim().toLowerCase();

  if (!valueInput) {
    alert("Please enter a Pokémon name or ID!");
    return;
  }

  try {
    const res = await fetch(`${apiUrl}${valueInput}`);
    if (!res.ok) {
      throw new Error("Pokemon not found");
    }
    const data = await res.json();

    showPokemon(data);
  } catch (error) {
    resetDisplay();
    alert(error.message);
  }
}

searchBtn.addEventListener("click", fetchData);
