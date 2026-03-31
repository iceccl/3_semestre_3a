import { Link } from "react-router-dom";

function Filmes() {
  return (
    <div>
      <h1>Filmes disponíveis</h1>
      <Link to='/Filmes/O Rei Leão'>O Rei Leão</Link>
      <br />
      <Link to='/Filmes/Coraline'>Coraline</Link>
      <br />
      <Link to='/Filmes/Como Treinar O Seu Dragão'>Como Treinar O Seu Dragão</Link>
      <br />
      <Link to='/Filmes/O Poderoso Chefão'>O Poderoso Chefão</Link>
      <br />
      <Link to='/Filmes/Mufasa'>Mufasa</Link>
      <hr />
      <Link to='/Inicio'>Voltar ao inicio</Link>
    </div>
  );
}

export default Filmes;
