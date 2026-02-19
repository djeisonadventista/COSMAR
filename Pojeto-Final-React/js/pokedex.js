// Pokédex Page Logic
let allPokemon = [];
let filteredPokemon = [];
let totalPokemon = 0;

// DOM Elements
const pokemonGrid = document.getElementById('pokemonGrid');
const typeFilter = document.getElementById('typeFilter');
const loadingSpinner = document.getElementById('loadingSpinner');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadInitialData();
    setupEventListeners();
});

/**
 * Load initial Pokémon data
 */
async function loadInitialData() {
    try {
        showLoading(true);
        
        // Get total count
        totalPokemon = await getTotalPokemonCount();
        
        // Load first page
        await loadPokemonPage(0);
        
        showLoading(false);
    } catch (error) {
        console.error('Error loading initial data:', error);
        showError('Erro ao carregar Pokémon. Tente novamente mais tarde.');
        showLoading(false);
    }
}

/**
 * Load Pokémon for a specific page
 * @param {number} offset - Offset for pagination
 */
async function loadPokemonPage(offset) {
    try {
        showLoading(true);
        allPokemon = await fetchPokemonList(offset, 20);
        filteredPokemon = [...allPokemon];
        renderPokemonCards(filteredPokemon);
        showLoading(false);
    } catch (error) {
        console.error('Error loading Pokémon page:', error);
        showError('Erro ao carregar Pokémon.');
        showLoading(false);
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    typeFilter.addEventListener('change', handleTypeFilter);
}

/**
 * Handle type filter
 */
async function handleTypeFilter(e) {
    const selectedType = e.target.value;
    
    if (selectedType === '') {
        filteredPokemon = [...allPokemon];
    } else {
        try {
            showLoading(true);
            filteredPokemon = await filterPokemonByType(selectedType);
            showLoading(false);
        } catch (error) {
            console.error('Error filtering by type:', error);
            showError('Erro ao filtrar por tipo.');
            showLoading(false);
            return;
        }
    }
    
    renderPokemonCards(filteredPokemon);
}

/**
 * Render Pokémon cards
 * @param {Array} pokemon - Array of Pokémon to render
 */
function renderPokemonCards(pokemon) {
    pokemonGrid.innerHTML = '';
    
    if (pokemon.length === 0) {
        pokemonGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <h4>Nenhum Pokémon encontrado</h4>
                <p class="text-muted">Tente ajustar o filtro</p>
            </div>
        `;
        return;
    }
    
    pokemon.forEach(poke => {
        const card = createPokemonCard(poke);
        pokemonGrid.appendChild(card);
    });
}

/**
 * Create a Pokémon card element
 * @param {Object} pokemon - Pokémon data
 * @returns {HTMLElement} Card element
 */
function createPokemonCard(pokemon) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 col-xl-3';
    
    const typesHTML = pokemon.types
        .map(type => `<span class="type-badge type-${type}">${type}</span>`)
        .join('');
    
    col.innerHTML = `
        <div class="pokemon-card" >
            <div class="pokemon-image">
                <img src="${pokemon.image}" alt="${pokemon.name}" onerror="this.src='https://via.placeholder.com/150?text=${pokemon.name}'">
            </div>
            <div class="pokemon-info">
                <div class="pokemon-id">#${String(pokemon.id).padStart(4, '0')}</div>
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-types">
                    ${typesHTML}
                </div>
            </div>
        </div>
    `;
    
    return col;
}

/**
 * Show loading spinner
 * @param {boolean} show - Whether to show the spinner
 */
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.add('show');
    } else {
        loadingSpinner.classList.remove('show');
    }
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show';
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    pokemonGrid.parentElement.insertBefore(alert, pokemonGrid);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}
