import { Link } from 'react-router-dom';

function IrParaPokedex({ titulo = 'Pronto para começar?', texto = '', link = '/pokedex' }) {
  return (
    <section className="py-5 bg-primary text-white text-center">
      <div className="container">
        <h2 className="mb-4">{titulo}</h2>
        <p className="lead mb-4">{texto}</p>
        <Link to={link} className="btn btn-light btn-lg">
          Ir para Pokédex
        </Link>
      </div>
    </section>
  );
}

export default IrParaPokedex;
