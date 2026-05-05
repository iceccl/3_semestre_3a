import { useState } from 'react'
import { View, Text, Image, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import Logo from '../assets/Logo.jpg'
import { LinearGradient } from 'expo-linear-gradient'

const Aula02 = () => {
    const [nome, setNome] = useState('')

    return(
        <View>
            <Text>-----------------------------------</Text>
            <Text>Aula 02 - Componentes Básicos</Text>
            <Text>Conhecendo os principais componentes do React Native</Text>
            {/* Inserindo imagem da internet */}
            <Image 
                source={{ uri: 'https://picsum.photos/300/200' }} 
                style={{ width: 300, height: 200 }}
            />
            {/* Inserindo uma imagem diretamente do caminho do arquivo */}
            <Image
                source={ require ('../assets/Logo.jpg')}
                style={{ width: 50, height: 50 }}
            />
            {/* Inserindo imagem referenciando como componente */}
            <Image
                source={Logo}
                style={{ width: 50, height: 50 }}
            />
            <TextInput 
                placeholder='Digite seu nome: '
                // Não preciso de arrow function () =>
                onChangeText={setNome}
                style={{ borderWidth: 1, padding: 10, marginBottom:10 }}
            />
            <Text>Seu nome é: {nome} </Text>
            {/* Botão com poucas possibilidade estilização */}
            <Button title='Clique aqui' 
                onPress={() => console.log(`Bem vindo ${nome}`)}
            />
            {/* Botão com controle total de estilização */}
            <TouchableOpacity 
                style={estilos.botao}
                onPress={() => console.log(`Bem vindo ${nome}`)}
            >
                <Image
                    source={Logo}
                    style={{ width: 25, height: 25 }}
                />
                <Text style={estilos.botaoTexto}>Botão TouchableOpacity</Text>
            </TouchableOpacity>

            <LinearGradient style={{height:50}}
                colors={['transparent', '#ff5d5d', 'transparent']}>
                    
            </LinearGradient>
        </View>
    )
}

const estilos = StyleSheet.create({ 
    botao: { backgroundColor:'#ff0000', padding: 12, borderRadius: 8, alignItems: 'center' },
    botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
 })

export default Aula02