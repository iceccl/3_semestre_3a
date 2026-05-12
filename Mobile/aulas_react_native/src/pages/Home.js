import { View, Text, Button } from 'react-native'

// Recebemos como props o navigation para podermos navegar entre as telas;
const Home = ({ navigation }) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d5edb9'}}>

            <Text style={{fontSize: 30}}>TELA PRINCIPAL</Text>
            {/* Nos botões, no onPress dizemos que queremos navegar para a página tal ao clicar */}
            <Button title='Ir para Tela de cadastro' onPress={() => navigation.navigate('Cadastro')}/>
            <Button title='Ir para Tela de Relatório' onPress={() => navigation.navigate('Relatorio')}/>
            <Button title='Ir para Tela de Gráfico' onPress={() => navigation.navigate('Grafico')}/>

        </View>
    )
}

export default Home;