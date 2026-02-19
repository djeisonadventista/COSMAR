import { useEffect, useState } from "react";
import PokemonCard from "../../componentes/PokemonCard";


const API_BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_LIMIT = 20;

export async function fetchPokemonList(limit = POKEMON_LIMIT) {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
  const data = await response.json();

  const pokemonDetails = await Promise.all(
    data.results.map(pokemon =>
      fetchPokemonDetails(pokemon.name)
    )
  );

  return pokemonDetails;
}

export async function fetchPokemonDetails(nameOrId) {
  const response = await fetch(
    `${API_BASE_URL}/pokemon/${nameOrId.toLowerCase()}`
  );
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default,
    types: data.types.map(type => type.type.name)
  };
}

export async function filterPokemonByType(type) {
  const response = await fetch(
    `${API_BASE_URL}/type/${type.toLowerCase()}`
  );
  const data = await response.json();

  const pokemonDetails = await Promise.all(
    data.pokemon.slice(0, 20).map(item =>
      fetchPokemonDetails(item.pokemon.name)
    )
  );

  return pokemonDetails;
}
//api.js

export default function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    loadPokemon();
  }, []);

  async function loadPokemon() {
    setLoading(true);
    const data = await fetchPokemonList();
    setPokemon(data);
    setLoading(false);
  }

  async function handleTypeChange(e) {
    const type = e.target.value;
    setSelectedType(type);

    if (type === "") {
      loadPokemon();
    } else {
      setLoading(true);
      const filtered = await filterPokemonByType(type);
      setPokemon(filtered);
      setLoading(false);
    }
  }

  return (
    <>

      <section className="py-4 bg-light">
        <div className="container">
          <div className="col-md-4">
            <select
              className="form-select form-select-lg"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="">Todos os Tipos</option>
              <option value="normal">Normal</option>
              <option value="fire">Fogo</option>
              <option value="water">Água</option>
              <option value="grass">Grama</option>
              <option value="electric">Elétrico</option>
              <option value="ice">Gelo</option>
              <option value="fighting">Lutador</option>
              <option value="poison">Veneno</option>
              <option value="ground">Terra</option>
              <option value="flying">Voador</option>
              <option value="psychic">Psíquico</option>
              <option value="bug">Inseto</option>
              <option value="rock">Pedra</option>
              <option value="ghost">Fantasma</option>
              <option value="dragon">Dragão</option>
              <option value="dark">Sombrio</option>
              <option value="steel">Aço</option>
              <option value="fairy">Fada</option>
            </select>
          </div>
        </div>
      </section>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      )}

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {pokemon.map(p => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
