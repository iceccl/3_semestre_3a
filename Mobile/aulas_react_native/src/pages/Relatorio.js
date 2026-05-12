import { View, Text, Button } from 'react-native'

// Recebemos como props o navigation para podermos navegar entre as telas;
const Relatorio = ({ navigation }) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3bd77'}}>

            <Text style={{fontSize: 30}}>TELA DE RELATÓRIO</Text>
            {/* Nos botões, no onPress dizemos que queremos navegar para a página tal ao clicar */}
            <Button title='Ir para Tela de Cadastro' onPress={() => navigation.navigate('Cadastro')}/>
            <Button title='Ir para Tela de Gráfico' onPress={() => navigation.navigate('Grafico')}/>
            <Button title='Voltar' onPress={() => navigation.goBack()}/>

        </View>
    )
}

export default Relatorio;