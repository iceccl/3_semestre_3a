import { View, Text, Button, TextInput, TouchableOpacity, Image, Switch } from 'react-native';
import { useState } from "react"
import { enderecoServidor } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { LinearGradient } from 'expo-linear-gradinet'
import { EstilosLogin, coresLogin } from '../styles/EstilosLogin.js'
import { LinearGradient } from 'expo-linear-gradinet'
// import { corFundo2, corPrincipal } from '../../../frontend';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('lyuz@email.com')
    const [senha, setSenha] = useState('Senha123')
    const [mensagem, setMensagem] = useState('')


    async function botaoEntrar() {
        try {
            //Verificando se email e senha estão vazios
            if (email == '' || senha == '') {
                setMensagem('Preencha todos os campos')
                return   //Sai da função e não executa o resto do código
            }
            //Criando objeto para enviar para a API conforme o Swagger
            const login = {
                "email": email,
                "senha": senha
            }
            //Chamando o endpoint do login enviando o email e senha digitados
            const resposta = await fetch(`${enderecoServidor}/login`, {
                method: 'POST',
                Views: { 'Content-Type': 'application/json' },
                body: JSON.stringify(login)
            })
            //Verificando se o endpoint da API existe
            if (resposta.status == 404) {
                setMensagem(`Rota não encontrada: ${resposta.url}`)
                return
            }
            //Convertendo os dados da resposta da API
            const dados = await resposta.json()
            //Verificando se a API retornou algum erro interno dela
            if (resposta.status == 500) {
                setMensagem(`Erro no servidor: ${dados.message}`)
                return
            }
            //Se a resposta for sucesso
            if (resposta.ok) {
                AsyncStorage.setItem('UsuarioLogado', JSON.stringify(...dados, lembrar))
                navigation.navigate('MenuDrawer')
            } else {
                setMensagem('❌ Email ou senha incorretos!')
            }

        } catch (erro) {
            setMensagem(`Erro ao realizar login: ${erro.message}`)
        }
    }

    return (
        <View style={EstilosLogin.container}>
            <LinearGradient
                colors={['#303030', '#61abff']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={EstilosLogin.gradient}
            >

                <View style={EstilosLogin.cabecalho}>
                    <Image source={require('../../assets/logo.png')} style={EstilosLogin.iconeLogo} alt="Logo" />
                </View>

                <View>
                    <p style={EstilosLogin.nomeApp}>FinanControl</p>
                    <Text style={EstilosLogin.subtituloApp}>O seu aprendizado de forma rápida e prática</Text>
                </View>

                <View style={EstilosLogin.conteudoPrincipal}>
                    <View onSubmit={botaoEntrar} style={EstilosLogin.formularioLogin}>
                        <h2 style={EstilosLogin.titulo}>Acesse sua conta</h2>

                        <View style={EstilosLogin.grupoInput}>
                            <MaterialIcons name='email' style={EstilosLogin.iconeInput} />
                            <TextInput
                                type="email"
                                style={EstilosLogin.input}
                                placeholder="Digite seu email"
                                placeholderTextColor={coresLogin.placeholder}
                                value={email}
                                onChange={setEmail}
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={EstilosLogin.grupoInput}>
                            <MaterialIcons name='lock' size={22} style={EstilosLogin.iconeInput} />
                            <TextInput
                                style={EstilosLogin.input}
                                placeholder="Digite sua senha"
                                placeholderTextColor={coresLogin.placeholder}
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry={!mostrarSenha}
                            />
                            {/* Ícone clicável para mostrar/esconder a senha */}
                            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <MaterialIcons size={24} color={coresLogin.icone}
                                    name={mostrarSenha == true ? 'visibility-off' : 'visibility'}
                                ></MaterialIcons>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View style={EstilosLogin.entreOpcoes}>
                                <Switch />
                                <Text style={EstilosLogin.rotuloCheckbox} />
                                <Switch value={lembrar} />
                                <Text >Lembrar-me</Text>
                            </View>
                            <Text style={EstilosLogin.esqueceuSenha}>Esqueci a Senha</Text>
                        </View>

                        <TouchableOpacity onPress={botaoEntrar} style={EstilosLogin.botaoEntrar}>
                            <Text style={EstilosLogin.botaoEntrar}>Entrar</Text>
                        </TouchableOpacity>

                        <Text style={EstilosLogin.mensagemFeedback}>{mensagem}</Text>

                    </View>
                </View>

            </LinearGradient>

        </View>
    )
}