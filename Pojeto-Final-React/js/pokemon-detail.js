// Pokémon Detail Page Logic
API_BASE_URL = 'https://pokeapi.co/api/v2';

// DOM Elements
const loadingDetail = document.getElementById('loadingDetail');
const detailContent = document.getElementById('detailContent');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const pokemonId = document.getElementById('pokemonId');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');
const statsContainer = document.getElementById('statsContainer');
const abilitiesContainer = document.getElementById('abilitiesContainer');
const movesContainer = document.getElementById('movesContainer');
const evolutionContainer = document.getElementById('evolutionContainer');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPokemonDetail();
});

/**
 * Get Pokémon ID from URL query parameter
 * @returns {string} Pokémon ID or name
 */
function getPokemonFromURL() {
    const params = new URLSearchParams(window.location.search);
    const pokemon = params.get('pokemon');
    
    if (!pokemon) {
        showError('Pokémon não especificado');
        return null;
    }
    
    return pokemon.toLowerCase();
}

/**
 * Load Pokémon details
 */
async function loadPokemonDetail() {
    try {
        const pokemon = getPokemonFromURL();
        if (!pokemon) return;
        
        // Fetch Pokémon details
        const pokemonData = await fetchPokemonDetails(pokemon);
        
        // Fetch species info for description
        const speciesData = await fetchPokemonSpecies(pokemon);
        
        // Fetch evolution chain
        const evolutionData = await fetchEvolutionChain(speciesData.evolution_chain.url);
        
        // Render all data
        renderPokemonDetail(pokemonData, speciesData, evolutionData);
        
        // Show content and hide loading
        loadingDetail.style.display = 'none';
        detailContent.style.display = 'block';
        
    } catch (error) {
        console.error('Error loading Pokémon detail:', error);
        showError('Erro ao carregar detalhes do Pokémon');
        loadingDetail.style.display = 'none';
    }
}

/**
 * Fetch Pokémon species information
 * @param {string} nameOrId - Pokémon name or ID
 * @returns {Promise<Object>} Species data
 */
async function fetchPokemonSpecies(nameOrId) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon-species/${nameOrId.toLowerCase()}`);
        if (!response.ok) throw new Error('Failed to fetch species');
        return await response.json();
    } catch (error) {
        console.error('Error fetching species:', error);
        throw error;
    }
}

/**
 * Fetch evolution chain
 * @param {string} url - Evolution chain URL
 * @returns {Promise<Object>} Evolution chain data
 */
async function fetchEvolutionChain(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch evolution chain');
        return await response.json();
    } catch (error) {
        console.error('Error fetching evolution chain:', error);
        return null;
    }
}

/**
 * Fetch Pokémon details
 * @param {string} nameOrId - Pokémon name or ID
 * @returns {Promise<Object>} Pokémon details
 */
async function fetchPokemonDetails(nameOrId) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${nameOrId.toLowerCase()}`);
        if (!response.ok) throw new Error(`Failed to fetch Pokémon: ${nameOrId}`);
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching Pokémon ${nameOrId}:`, error);
        throw error;
    }
}

/**
 * Render Pokémon details on the page
 * @param {Object} pokemon - Pokémon data
 * @param {Object} species - Species data
 * @param {Object} evolution - Evolution chain data
 */
function renderPokemonDetail(pokemon, species, evolution) {
    // Basic Info
    pokemonImage.src = pokemon.sprites.other['official-artwork'].front_default || 
                       pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonId.textContent = `#${String(pokemon.id).padStart(4, '0')}`;
    
    pokemonHeight.textContent = `${(pokemon.height / 10).toFixed(1)}m`;
    pokemonWeight.textContent = `${(pokemon.weight / 10).toFixed(1)}kg`;
    
    // Types
    const typesHTML = pokemon.types
        .map(type => `<span class="type-badge-large type-${type.type.name}">${type.type.name}</span>`)
        .join('');
    pokemonTypes.innerHTML = typesHTML;
    
    // Stats
    renderStats(pokemon.stats);
    
    // Abilities
    renderAbilities(pokemon.abilities);
    
    // Moves
    renderMoves(pokemon.moves);
    
    // Evolution Chain
    if (evolution) {
        renderEvolutionChain(evolution.chain);
    }
}

/**
 * Render stats
 * @param {Array} stats - Stats array
 */
function renderStats(stats) {
    let statsHTML = '';
    
    const statNames = {
        'hp': 'HP',
        'attack': 'Ataque',
        'defense': 'Defesa',
        'special-attack': 'Sp. Ataque',
        'special-defense': 'Sp. Defesa',
        'speed': 'Velocidade'
    };
    
    stats.forEach(stat => {
        const statName = statNames[stat.stat.name] || stat.stat.name;
        const percentage = (stat.base_stat / 255) * 100;
        
        statsHTML += `
            <div class="stat-row">
                <div class="d-flex align-items-center">
                    <span class="stat-label">${statName}</span>
                    <div class="stat-bar flex-grow-1">
                        <div class="stat-fill" style="width: ${percentage}%">
                            ${stat.base_stat}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    statsContainer.innerHTML = statsHTML;
}

/**
 * Render abilities
 * @param {Array} abilities - Abilities array
 */
function renderAbilities(abilities) {
    let abilitiesHTML = '';
    
    abilities.forEach(ability => {
        const isHidden = ability.is_hidden ? ' (Oculta)' : '';
        abilitiesHTML += `<span class="ability-badge">${ability.ability.name}${isHidden}</span>`;
    });
    
    abilitiesContainer.innerHTML = abilitiesHTML || '<p class="text-muted">Nenhuma habilidade encontrada</p>';
}

/**
 * Render moves (show first 12)
 * @param {Array} moves - Moves array
 */
function renderMoves(moves) {
    let movesHTML = '';
    
    const displayMoves = moves.slice(0, 12);
    
    displayMoves.forEach(move => {
        movesHTML += `<span class="badge bg-info text-dark me-2 mb-2">${move.move.name}</span>`;
    });
    
    if (moves.length > 12) {
        movesHTML += `<span class="badge bg-secondary">+${moves.length - 12} mais</span>`;
    }
    
    movesContainer.innerHTML = movesHTML || '<p class="text-muted">Nenhum movimento encontrado</p>';
}

/**
 * Render evolution chain
 * @param {Object} chain - Evolution chain data
 */
async function renderEvolutionChain(chain) {
    let evolutionHTML = '';
    
    // Get first Pokémon
    const firstPokemon = chain.species.name;
    const firstImage = await getPokemonImage(firstPokemon);
    
    evolutionHTML += `
        <div class="evolution-item">
            <img src="${firstImage}" alt="${firstPokemon}">
            <p class="mt-2 fw-bold text-capitalize">${firstPokemon}</p>
            <a href="pokemon-detail.html?pokemon=${firstPokemon}" class="btn btn-sm btn-outline-primary">Ver</a>
        </div>
    `;
    
    // Check for evolutions
    if (chain.evolves_to.length > 0) {
        evolutionHTML += '<div class="evolution-arrow">→</div>';
        
        for (const evolution of chain.evolves_to) {
            const secondPokemon = evolution.species.name;
            const secondImage = await getPokemonImage(secondPokemon);
            
            evolutionHTML += `
                <div class="evolution-item">
                    <img src="${secondImage}" alt="${secondPokemon}">
                    <p class="mt-2 fw-bold text-capitalize">${secondPokemon}</p>
                    <a href="pokemon-detail.html?pokemon=${secondPokemon}" class="btn btn-sm btn-outline-primary">Ver</a>
                </div>
            `;
            
            // Check for further evolutions
            if (evolution.evolves_to.length > 0) {
                evolutionHTML += '<div class="evolution-arrow">→</div>';
                
                for (const thirdEvolution of evolution.evolves_to) {
                    const thirdPokemon = thirdEvolution.species.name;
                    const thirdImage = await getPokemonImage(thirdPokemon);
                    
                    evolutionHTML += `
                        <div class="evolution-item">
                            <img src="${thirdImage}" alt="${thirdPokemon}">
                            <p class="mt-2 fw-bold text-capitalize">${thirdPokemon}</p>
                            <a href="pokemon-detail.html?pokemon=${thirdPokemon}" class="btn btn-sm btn-outline-primary">Ver</a>
                        </div>
                    `;
                }
            }
        }
    }
    
    evolutionContainer.innerHTML = evolutionHTML;
}

/**
 * Get Pokémon image URL
 * @param {string} pokemonName - Pokémon name
 * @returns {Promise<string>} Image URL
 */
async function getPokemonImage(pokemonName) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok) throw new Error('Failed to fetch image');
        
        const data = await response.json();
        return data.sprites.other['official-artwork'].front_default || 
               data.sprites.front_default ||
               'https://via.placeholder.com/150?text=' + pokemonName;
    } catch (error) {
        console.error('Error fetching image:', error);
        return 'https://via.placeholder.com/150?text=' + pokemonName;
    }
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    loadingDetail.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Erro!</h4>
            <p>${message}</p>
            <hr>
            <a href="pokedex.html" class="btn btn-primary">Voltar para Pokédex</a>
        </div>
    `;
}
