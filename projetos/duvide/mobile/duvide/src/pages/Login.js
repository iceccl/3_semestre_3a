import {View,Text,Button,TextInput,TouchableOpacity, Image,Switch} from "react-native";
import { useState, useEffect } from "react";
import { enderecoServidor } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { EstilosLogin, coresLogin } from "../../EstilosLogin";
import { MaterialIcons } from "@expo/vector-icons";
import { corFundo, corPrincipal } from "../styles/Estilos";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("lyuz@email.com");
  const [senha, setSenha] = useState("Senha123");
  const [mensagem, setMensagem] = useState("");

  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function botaoEntrar() {
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

      // Chamando o endpoint do login enviando o email e a senha editados
      const resposta = await fetch(`${enderecoServidor}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosLogin),
      });

      if (resposta.status == 404) {
        setMensagem(`Rota não encontrada: ${resposta.url}`);
        return;
      }

      // Convertendo os dados da resposta da API
      const dados = await resposta.json();
      // Verificando se a API retornou algum erro interno dela
      if (resposta.status == 500) {
        setMensagem(`Erro no servidor: ${dados.message}`);
        return;
      }

      // Se a resposta for um sucesso
      if (resposta.ok) {
        AsyncStorage.setItem("UsuarioLogado", JSON.stringify({...dados, lembrar}));
        navigation.navigate("MenuDrawer");
      } else {
        setMensagem("❌ email ou senha incorretos");
      }

      // -------------------------------------------------------------
    } catch (error) {
      setMensagem(`Erro ao realizar login, ${error.message}`);
    }
  }

  useEffect(() => {
          async function buscarUsuario() {
              const UsuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
              if (UsuarioLogado != null) {
                const usuario = JSON.parse(UsuarioLogado)
                if (usuario.lembrar == true) {
                  navigation.navigate('MenuDrawer')
                }
              }
          }
          buscarUsuario()
      }, [])

  return (
    <View style={EstilosLogin.container} >
      <LinearGradient
        colors={[corFundo, corPrincipal]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={EstilosLogin.gradiente}
      >
        <View style={EstilosLogin.cabecalho}>
          <Image
            source={require("../../assets/icon.png")}
            style={EstilosLogin.iconeLogo}
          />
          <View>
            <Text style={EstilosLogin.nomeApp}>Duvide</Text>
            <Text style={EstilosLogin.subtituloApp}>
              O app que conecta você a especialistas para tirar suas dúvidas!
            </Text>
          </View>
        </View>

        <main style={EstilosLogin.conteudoPrincipal}>
          <View style={EstilosLogin.formularioLogin}>
            <Text style={EstilosLogin.titulo}>Acesse sua conta</Text>

            <View style={EstilosLogin.grupoInput}>
              <MaterialIcons name="email" style={EstilosLogin.iconeInput} />
              <TextInput
                style={EstilosLogin.input}
                placeholder="Digite seu email"
                placeholderTextColor={coresLogin.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={EstilosLogin.grupoInput}>
              <MaterialIcons
                name="lock"
                size={22}
                style={EstilosLogin.iconeInput}
              />
              <TextInput
                placeholder="Digite sua senha"
                placeholderTextColor={coresLogin.placeholder}
                style={EstilosLogin.input}
                value={senha}
                onChangeText={setSenha}
                keyboardType="password"
                autoCapitalize="none"
                secureTextEntry={!mostrarSenha}
              />
              <TouchableOpacity
                style={EstilosLogin.alternarVisibilidade}
                onPress={() => setMostrarSenha(!mostrarSenha)}
              >
                <MaterialIcons
                  size={22}
                  color={coresLogin.icone}
                  name={mostrarSenha == true ? "visibility-off" : "visibility"}
                />
              </TouchableOpacity>
            </View>

            <View style={EstilosLogin.entreOpcoes}>
              <View style={EstilosLogin.containerCheckbox}>
                <Switch
                  value={lembrar}
                  onValueChange={setLembrar}
                />
                <Text style={EstilosLogin.rotuloCheckbox}>Lembrar-me</Text>
              </View>
              <Text href="#" style={EstilosLogin.esqueceuSenha}>
                Esqueci a senha
              </Text>
            </View>

            <TouchableOpacity
              onPress={botaoEntrar}
              style={EstilosLogin.botaoEntrar}
            >
              <Text style={EstilosLogin.textoBotaoEntrar}>Entrar</Text>
            </TouchableOpacity>

            <Text style={EstilosLogin.mensagemFeedback}>{mensagem}</Text>
          </View>
        </main>
      </LinearGradient>
    </View>
  );
}
