import { View, Text, Button } from 'react-native'

// Recebemos como props o navigation para podermos navegar entre as telas;
const Login = ({ navigation }) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{fontSize: 30}}>TELA DE LOGIN</Text>
            {/* Nos botões, no onPress dizemos que queremos navegar para a página tal ao clicar */}
            <Button title='ENTRAR' onPress={() => navigation.navigate('MenuPrincipal')}/>

        </View>
    )
}

export default Login;