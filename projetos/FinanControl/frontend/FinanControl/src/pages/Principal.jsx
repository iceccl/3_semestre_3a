import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Principal () {
    const navigate = useNavigate()
    const [dadosLogin, setDadosLogin] = useState(null)

    useEffect(() => {
        async function buscarUsuario() {
            const UsuarioLogado = await localStorage.getItem('UsuarioLogado')
            if (UsuarioLogado != null) {
                setDadosLogin(JSON.parse(UsuarioLogado))
            }
        }
        buscarUsuario()
    }, [])

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc'}}>
                {/* ? --> validação se a variável é nula ou não, se for nula ele espera */}
                <p>Usuário: {dadosLogin?.usuario?.nome}</p>
                <p>Email: {dadosLogin?.usuario?.email}</p>
                <button>Sair</button>
            </div>
        </div>
    )
}