import { Fragment } from "react";
import { Link } from 'react-router-dom';
import IrParaPokedex from '../../componentes/IrParaPokedex';

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <div className="text-center text-white">
            <h1 className="display-3 fw-bold mb-4">Bem-vindo à Pokédex</h1>
            <p className="lead mb-4">Descubra e explore todos os Pokémon do mundo!</p>
            <Link to="/pokedex" className="btn btn-primary btn-lg">
              Explorar Pokédex
            </Link>
          </div>
        </div>
      </section>

      <IrParaPokedex
        titulo="Pronto para começar?"
        texto="Explore a Pokédex e descubra novos Pokémon!"
        link="/pokedex"
      />
    </>
  );
}
