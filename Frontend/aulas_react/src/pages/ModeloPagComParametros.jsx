import { Link, useParams } from "react-router-dom";

function ABCDE() {
  const { teste } = useParams()

  return (
    <div>
      <h1>Este é o teste de { teste }</h1>
        <Link to='/'>Voltar para Página Principal</Link>
    </div>
  );
}

export default ABCDE;
