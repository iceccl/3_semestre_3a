import { View, Text, Button, TextInput } from 'react-native';
import { useState } from "react";
import {enderecoServidor} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('ricardo2@email.com')
    const [senha, setSenha] = useState('Senha123')
    const [mensagem, setMensagem] = useState('')

    async function botaoEntrar() {
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
    
            // Chamando o endpoint do login enviando o email e a senha editados
            const resposta = await fetch(`${enderecoServidor}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(login)
            })

            if (resposta.status == 404){
                setMensagem(`Rota não encontrada: ${resposta.url}`)
                return
            }

            // Convertendo os dados da resposta da API
            const dados = await resposta.json()
            // Verificando se a API retornou algum erro interno dela
            if (resposta.status == 500) {
                setMensagem(`Erro no servidor: ${dados.message}`)
                return
            }

            // Se a resposta for um sucesso
            if (resposta.ok) {
                AsyncStorage.setItem('UsuarioLogado', JSON.stringify(dados))
                navigation.navigate('MenuDrawer')
            } else {
                setMensagem('❌ email ou senha incorretos')
            }


            // -------------------------------------------------------------
            } catch (error) {
                setMensagem(`Erro ao realizar login, ${error.message}`)
            }
        }

    return (
        <View>
            <Text>Tela de Login</Text>
            <Text>Email</Text>
            <TextInput type="email" placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
            />

            <Text>Senha</Text>
            <TextInput secureTextEntry={true} placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha}
            />
            <Button onPress={botaoEntrar} title='Entrar'></Button>
            <Text style={{color: '#f00'}}> {mensagem} </Text>
        </View>
    )
}