import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { enderecoServidor } from '../utils.jsx'

import { MdEmail, MdLock, MdPassword, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { EstilosLogin } from '../style/EstilosLogin'
import logo from '../assets/react.svg'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('lyuz@email.com')
    const [senha, setSenha] = useState('Senha123')
    
    const [mensagem, setMensagem] = useState('')

    const [lembrar, setLembrar] = useState(false)
    const [mostrarSenha, setMostrarSenha] = useState(false)

    async function botaoEntrar(event) {
        event.preventDefault()

        try {
            if (email === '' || senha === '') {
                setMensagem('Preencha todos os campos')
                return
            }

            const dadosLogin = {
                "email": email,
                "senha": senha
            }

            const resposta = await fetch(`${enderecoServidor}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosLogin)
            })

            if (resposta.status === 404) {
                setMensagem(`Rota não encontrada: ${resposta.url}`)
                return
            }

            if (resposta.status === 500) {
                try {
                    const dadosErro = await resposta.json()
                    setMensagem(`Erro no servidor: ${dadosErro.message}`)
                } catch {
                    setMensagem('Erro interno no servidor (500).')
                }
                return
            }

            if (resposta.ok) {
                const dados = await resposta.json()
                localStorage.setItem('UsuarioLogado', JSON.stringify({ ...dados, lembrar }))
                navigate('/principal')
            } else {
                setMensagem('❌ Email ou senha incorretos!')
            }

        } catch (erro) {
            setMensagem(`Erro ao realizar login: ${erro.message}`)
        }
    }

    useEffect(() => {
        async function buscarUsuario() {
            const usuarioLogado = await localStorage.getItem('UsuarioLogado')
            if (usuarioLogado != null) {
                const usuario = (JSON.parse(usuarioLogado))
                if (usuario.lembrar == true) {
                    navigate('/principal')
                }
            }
        }
        buscarUsuario()
    }, [])

    return (
        <div style={EstilosLogin.container}>
            <header style={EstilosLogin.cabecalho}>
                <img src={logo} style={EstilosLogin.iconeLogo} alt="Logo" />
            </header>

            <div>
                <p style={EstilosLogin.nomeApp}>Duvide</p>
                <h1 style={EstilosLogin.subtituloApp}>Tire suas dúvidas</h1>
            </div>

            <main style={EstilosLogin.conteudoPrincipal}>
                <form onSubmit={botaoEntrar} style={EstilosLogin.formularioLogin}>
                    <h2 style={EstilosLogin.titulo}>Acesse sua conta</h2>

                    <div style={EstilosLogin.grupoInput}>
                        <MdEmail style={EstilosLogin.iconeInput} />
                        <input
                            type="email"
                            style={EstilosLogin.input}
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={EstilosLogin.grupoInput}>
                        <MdPassword style={EstilosLogin.iconeInput} />
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            style={EstilosLogin.input}
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        {/* Ícone clicável para mostrar/esconder a senha */}
                        <span onClick={() => setMostrarSenha(!mostrarSenha)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            {mostrarSenha ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                        </span>
                    </div>

                    <div>
                        <div style={EstilosLogin.entreOpcoes}>
                            <input type="checkbox" style={EstilosLogin.checkbox} />
                            <label htmlFor="">Lembrar-me</label>
                        </div>
                        <a href="#" style={EstilosLogin.esqueceuSenha}>Esqueci a Senha</a>
                    </div>
                    <button type="submit" style={EstilosLogin.botaoEntrar}>Entrar</button>
                </form>
            </main>
        </div>
    )
}