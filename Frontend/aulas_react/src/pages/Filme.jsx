import { Link, useParams } from "react-router-dom";

function Filme() {
  const { nomeFilme } = useParams()

  return (
    <div>
      <h1>{ nomeFilme }</h1>
      <button>Assistir</button>
      <button>Favoritar</button>
      <br />
      <Link to='/Filmes'>Voltar para Página Principal</Link>
    </div>
  );
}

export default Filme;
