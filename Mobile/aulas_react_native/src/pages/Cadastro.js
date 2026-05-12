import { View, Text, Button } from 'react-native'

// Recebemos como props o navigation para podermos navegar entre as telas;
const Cadastro = ({ navigation }) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e37777'}}>

            <Text style={{fontSize: 30}}>TELA DE CADASTRO</Text>
            {/* Nos botões, no onPress dizemos que queremos navegar para a página tal ao clicar */}
            <Button title='Ir para Tela de Relatório' onPress={() => navigation.navigate('Relatorio')}/>
            <Button title='Ir para Tela de Gráfico' onPress={() => navigation.navigate('Grafico')}/>
            <Button title='Voltar' onPress={() => navigation.goBack()}/>

        </View>
    )
}

export default Cadastro;