import { View, Text, Button } from 'react-native'

// Recebemos como props o navigation para podermos navegar entre as telas;
const Grafico = ({ navigation }) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#79e377'}}>

            <Text style={{fontSize: 30}}>TELA DE GRÁFICO</Text>
            {/* Nos botões, no onPress dizemos que queremos navegar para a página tal ao clicar */}
            <Button title='Ir para Tela de Relatório' onPress={() => navigation.navigate('Relatorio')}/>
            <Button title='Voltar' onPress={() => navigation.goBack()}/>

        </View>
    )
}

export default Grafico;