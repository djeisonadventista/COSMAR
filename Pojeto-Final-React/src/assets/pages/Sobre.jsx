import { Fragment } from "react";
import IrParaPokedex from '../../componentes/IrParaPokedex';

export default function Sobre() {
    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <h1 className="display-4 fw-bold mb-4">Sobre a Pokédex</h1>
                            <p className="lead mb-3">
                                A Pokédex é uma enciclopédia digital que contém informações sobre todos os Pokémon conhecidos.
                                Este projeto foi criado para demonstrar como integrar APIs externas com HTML, CSS e JavaScript.
                            </p>
                            <p className="mb-3">
                                Utilizamos a <strong>PokéAPI</strong>, uma API gratuita e aberta que fornece dados detalhados sobre
                                Pokémon, incluindo suas estatísticas, tipos, habilidades e muito mais.
                            </p>
                        </div>
                        <div className="col-lg-6 text-center">
                            <span style={{ fontSize: '150px' }}>🎮</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Tecnologias Utilizadas</h2>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="tech-card">
                                <h5>Frontend</h5>
                                <ul className="list-unstyled">
                                    <li>✓ HTML5</li>
                                    <li>✓ CSS3</li>
                                    <li>✓ JavaScript ES6+</li>
                                    <li>✓ Bootstrap 5</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="tech-card">
                                <h5>API & Recursos</h5>
                                <ul className="list-unstyled">
                                    <li>✓ PokéAPI (pokeapi.co)</li>
                                    <li>✓ Fetch API</li>
                                    <li>✓ Async/Await</li>
                                    <li>✓ JSON</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

<section className="py-5">
        <div className="container">
            <h2 className="text-center mb-5">Tipos de Pokémon</h2>
            <div className="row g-3">
                <div className="col-md-4">
                    <div className="type-badge type-normal">Normal</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-fire">Fogo</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-water">Água</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-grass">Grama</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-electric">Elétrico</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-ice">Gelo</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-fighting">Lutador</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-poison">Veneno</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-ground">Terra</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-flying">Voador</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-psychic">Psíquico</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-bug">Inseto</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-rock">Pedra</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-ghost">Fantasma</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-dragon">Dragão</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-dark">Sombrio</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-steel">Aço</div>
                </div>
                <div className="col-md-4">
                    <div className="type-badge type-fairy">Fada</div>
                </div>
            </div>
        </div>
    </section>


            <section>
                <IrParaPokedex
                    titulo="Gostou da Pokédex?"
                    texto="Explore todos os Pokémon e descubra novos favoritos!"
                    link="/pokedex"
                />
            </section>
        </>
    );
}
