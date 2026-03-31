import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div>
      <h1>Bem vindo</h1>
      <Link to='/Detalhes'>Detalhes</Link>
      <br />
      <Link to='/Filmes'>Filmes</Link>
      <hr />
      <Link to='/'>Pagina principal</Link>
    </div>
  );
}

export default Inicio;
