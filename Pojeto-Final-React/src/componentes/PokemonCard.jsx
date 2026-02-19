export default function PokemonCard({ pokemon }) {
    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="pokemon-card">
                <div className="pokemon-image">
                    <img src={pokemon.image} alt={pokemon.name} />
                </div>

                <div className="pokemon-info">
                    <div className="pokemon-id">
                        #{String(pokemon.id).padStart(4, "0")}
                    </div>

                    <div className="pokemon-name">
                        {pokemon.name}
                    </div>

                    <div className="pokemon-types">
                        {pokemon.types.map(type => (
                            <span
                                key={type}
                                className={`type-badge type-${type}`}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
