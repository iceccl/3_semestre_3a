import { useNavigate  } from "react-router-dom"
import { useState } from "react"
import {enderecoServidor} from '../utils'

export default function Login () {
    const navigate = useNavigate()
    const [email, setEmail] = useState('ricardo2@email.com')
    const [senha, setSenha] = useState('Senha123')
    const [mensagem, setMensagem] = useState('')

    async function botaoEntrar(event) {
        event.preventDefault()

        try {
            if (email == '' || senha == '') {
                setMensagem('Preencha todos os campos')
                return // Sai da função e não executa o resto do código
            }

            // Abrindo a Api -----------------------------------------------
            const login = {
                "email": email,
                "senha": senha
            }

            const resposta = await fetch(`${enderecoServidor}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(login)
            })
            if (resposta.status == 404){
                setMensagem(`Rota não encontrada: ${resposta.url}`)
                return
            }
            const dados = await resposta.json()
            if (resposta.status == 500) {
                setMensagem(`Erro no servidor: ${dados.message}`)
                return
            }
            if (resposta.ok) {
                localStorage.setItem('UsuarioLogado', JSON.stringify(dados))
                navigate('/principal')
            } else {
                setMensagem('❌ email ou senha incorretos')
            }


            // -------------------------------------------------------------
        } catch (error) {
            setMensagem(`Erro ao realizar login, ${error.message}`)
        }
    }

    return (
        <div>
            <h1>Tela de Login</h1>
            <label>Email</label>
            <input type="email" placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={botaoEntrar}> Entrar </button>
            <p style={{color: '#f00'}}> {mensagem} </p>
        </div>
    )
}