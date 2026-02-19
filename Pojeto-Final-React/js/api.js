// PokéAPI Configuration
let API_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_LIMIT = 20;

/**
 * Fetch Pokémon list with pagination
 * @param {number} offset - Number of Pokémon to skip
 * @param {number} limit - Number of Pokémon to fetch
 * @returns {Promise<Array>} Array of Pokémon data
 */
async function fetchPokemonList(limit = POKEMON_LIMIT) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch Pokémon list');
        
        const data = await response.json();
        
        // Fetch detailed data for each Pokémon
        const pokemonDetails = await Promise.all(
            data.results.map(pokemon => fetchPokemonDetails(pokemon.name))
        );
        
        return pokemonDetails;
    } catch (error) {
        console.error('Error fetching Pokémon list:', error);
        throw error;
    }
}

/**
 * Fetch detailed information about a specific Pokémon
 * @param {string} nameOrId - Pokémon name or ID
 * @returns {Promise<Object>} Pokémon details
 */
async function fetchPokemonDetails(nameOrId) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${nameOrId.toLowerCase()}`);
        if (!response.ok) throw new Error(`Failed to fetch Pokémon: ${nameOrId}`);
        
        const data = await response.json();
        return formatPokemonData(data);
    } catch (error) {
        console.error(`Error fetching Pokémon ${nameOrId}:`, error);
        throw error;
    }
}

/**
 * Search Pokémon by name
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching Pokémon
 */
async function searchPokemon(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon?limit=1000`);
        if (!response.ok) throw new Error('Failed to fetch Pokémon list');
        
        const data = await response.json();
        const filtered = data.results.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        
        // Fetch details for filtered Pokémon
        const pokemonDetails = await Promise.all(
            filtered.slice(0, 20).map(pokemon => fetchPokemonDetails(pokemon.name))
        );
        
        return pokemonDetails;
    } catch (error) {
        console.error('Error searching Pokémon:', error);
        throw error;
    }
}

/**
 * Filter Pokémon by type
 * @param {string} type - Pokémon type
 * @returns {Promise<Array>} Array of Pokémon with the specified type
 */
async function filterPokemonByType(type) {
    try {
        const response = await fetch(`${API_BASE_URL}/type/${type.toLowerCase()}`);
        if (!response.ok) throw new Error(`Failed to fetch type: ${type}`);
        
        const data = await response.json();
        
        // Fetch details for Pokémon of this type (limit to 20)
        const pokemonDetails = await Promise.all(
            data.pokemon.slice(0, 20).map(item => fetchPokemonDetails(item.pokemon.name))
        );
        
        return pokemonDetails;
    } catch (error) {
        console.error(`Error filtering Pokémon by type ${type}:`, error);
        throw error;
    }
}

/**
 * Format Pokémon data for display
 * @param {Object} data - Raw Pokémon data from API
 * @returns {Object} Formatted Pokémon data
 */
function formatPokemonData(data) {
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default || 
               data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        height: (data.height / 10).toFixed(1), // Convert to meters
        weight: (data.weight / 10).toFixed(1), // Convert to kg
        stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            spAtk: data.stats[3].base_stat,
            spDef: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
        },
        abilities: data.abilities.map(ability => ability.ability.name),
        description: 'Pokémon interessante com múltiplos tipos e habilidades!',
    };
}

/**
 * Get total count of Pokémon
 * @returns {Promise<number>} Total number of Pokémon
 */
async function getTotalPokemonCount() {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon?limit=1`);
        if (!response.ok) throw new Error('Failed to fetch Pokémon count');
        
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error('Error fetching Pokémon count:', error);
        throw error;
    }
}
