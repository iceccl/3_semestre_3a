import { estilos } from "../style/Estilos"
import { Link, useNavigate } from "react-router-dom"

const Aula14 = () => {
    const navigate = useNavigate()
    return (
        <div style={estilos.cardAula}>
            <h2>Aula 14 - React router - navegação em React</h2>
            <h3>Biblioteca que permite criar e gerenciar rotas em react</h3>
            <hr />
            <h3>Navegação por link</h3>

            {/* <a href='/'> Página principal </a> */}
            <Link to='/'> Página Principal </Link>
            <br />
            <Link to='/Sobre'> Sobre </Link>
            <br />
            {/* somente "*" na definição das rotas */}
            <Link to='/jsjaflkd'> Pagina não encontrada </Link>
            <br />
            <h3>Navegação com programação utilizando o useNavigate</h3>
            <button onClick={() => {navigate('/Sobre')}} >Sobre</button>
            <hr />
            <h3>Rotas dinâmicas *rotas com parâmetros* (useParams)</h3>
            <button onClick={() => {navigate('/Perfil/Douglas')}} >Perfil do douglas</button>
            <button onClick={() => {navigate('/Perfil/Ricado')}} >Perfil do Ricado</button>
            <hr />

            {/* Atividade */}
            <Link to='/Inicio'>Pagina início</Link>
        </div>
    )
}

export default Aula14