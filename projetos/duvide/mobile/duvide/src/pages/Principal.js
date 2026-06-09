import { Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Principal({ navigation }) {
    const [dadosLogin, setDadosLogin] = useState(null)

    useEffect(() => {
            async function buscarUsuario() {
                const UsuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
                if (UsuarioLogado != null) {
                    setDadosLogin(JSON.parse(UsuarioLogado))
                }
            }
            buscarUsuario()
        }, [])

    function botaoLogout() {
        AsyncStorage.removeItem('UsuarioLogado')
        navigation.navigate('Login')
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent:'space-between', padding:'10px'}}>
                <View>
                    <Text>Nome: {dadosLogin?.usuario?.nome}</Text>
                    <Text>email: {dadosLogin?.usuario?.email}</Text>
                </View>
                <TouchableOpacity onPress={botaoLogout}>Sair</TouchableOpacity>
            </View>
        </View>
    )
}