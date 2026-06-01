import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { enderecoServidor } from "../utils";
import { MdEmail, MdLock, MdPassword, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { EstilosLogin } from "../styles/EstilosLogin";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("ricardo2@email.com");
  const [senha, setSenha] = useState("Senha123");
  const [mensagem, setMensagem] = useState("");

  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function botaoEntrar(event) {
    event.preventDefault();

    try {
      if (email == "" || senha == "") {
        setMensagem("Preencha todos os campos");
        return; // Sai da função e não executa o resto do código
      }

      // Abrindo a Api -----------------------------------------------
      const dadosLogin = {
        email: email,
        senha: senha,
      };

      const resposta = await fetch(`${enderecoServidor}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosLogin),
      });
      if (resposta.status == 404) {
        setMensagem(`Rota não encontrada: ${resposta.url}`);
        return;
      }
      const dados = await resposta.json();
      if (resposta.status == 500) {
        setMensagem(`Erro no servidor: ${dados.message}`);
        return;
      }
      if (resposta.ok) {
        localStorage.setItem("UsuarioLogado", JSON.stringify(dados));
        navigate("/principal");
      } else {
        setMensagem("❌ email ou senha incorretos");
      }

      // -------------------------------------------------------------
    } catch (error) {
      setMensagem(`Erro ao realizar login, ${error.message}`);
    }
  }

  return (
    <div style={EstilosLogin.container}>
      <header style={EstilosLogin.cabecalho}>
        <img src={logo} style={EstilosLogin.iconeLogo} />
        <div>
          <h1 style={EstilosLogin.nomeApp}>FinanControl</h1>
          <p style={EstilosLogin.subtituloApp}>O Seu Controle Financeir</p>
        </div>
      </header>

      <main style={EstilosLogin.conteudoPrincipal}>
        <form style={EstilosLogin.formularioLogin}>
          <h2 style={EstilosLogin.titulo}>Acesse sua conta</h2>

          <div style={EstilosLogin.grupoInput}>
            <MdEmail style={EstilosLogin.iconeInput} />
            <input
              type="email"
              style={EstilosLogin.input}
              value={email}
              onChange={(e) => setEmail(e.target.email)}
            />
          </div>

          <div style={EstilosLogin.grupoInput}>
            <MdLock style={EstilosLogin.iconeInput}/>
            <input
              type={mostrarSenha == true? 'text' : "password"}
              style={EstilosLogin.input}
              value={senha}
              onChange={(e) => setSenha(e.target.senha)}
            />
            <button style={EstilosLogin.alternarVisibilidade}
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
            >
                {mostrarSenha == true? <MdVisibility/> : <MdVisibilityOff/>} 
            </button>
          </div>

          <div style={EstilosLogin.entreOpcoes}>
            <div style={EstilosLogin.containerCheckbox}>
                <input type="checkbox" style={EstilosLogin.checkbox}/>
                <label>Lembrar-me</label>
            </div>
            <a href="#" style={EstilosLogin.esqueceuSenha}>Esqueci a senha</a>
          </div>

          <button type="submit" onClick={botaoEntrar} style={EstilosLogin.botaoEntrar}>
            Entrar
          </button>

          <p style={EstilosLogin.mensagemFeedback}>{mensagem}</p>
        </form>
      </main>
    </div>
  );
}
