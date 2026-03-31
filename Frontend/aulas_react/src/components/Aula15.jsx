import { estilos } from "../style/Estilos"
import { Link } from "react-router-dom"
import Aula15_Login from "./Aula15_Login"

const Aula15 = () => {
    return (
        <div style={estilos.cardAula}>
            <h2>Aula 15 - Login com API</h2>
            <h3>Utilizando o login juntamente com nossa API</h3>
            <Aula15_Login />
            <Link to='/login'>Login</Link>
        </div>
    )
}

export default Aula15