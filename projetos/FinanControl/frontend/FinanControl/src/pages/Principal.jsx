import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Principal () {
    const navigate = useNavigate()
    const [dadosLogin, setDadosLogin] = useState(null)

    // use effect funciona ao carregar a pagina
    useEffect(() => {
        async function buscarUsuario() {
            const UsuarioLogado = await localStorage.getItem('UsuarioLogado')
            if (UsuarioLogado != null) {
                setDadosLogin(JSON.parse(UsuarioLogado))
            }
        }
        buscarUsuario()
    }, [])

    function botaoLogout() {
        localStorage.removeItem('UsuarioLogado')
        navigate('/')
    }
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc'}}>
                {/* ? --> validação se a variável é nula ou não, se for nula ele espera */}
                <div style={{display: 'flex', flexDirection: 'row', gap:'10px'}}>
                    <p>Usuário: {dadosLogin?.usuario?.nome}</p>
                    <p>Email: {dadosLogin?.usuario?.email}</p>
                </div>
                
                <button onClick={botaoLogout}>Sair</button>
            </div>
        </div>
    )
}