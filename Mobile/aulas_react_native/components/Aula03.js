import { View, Text, FlatList } from "react-native";
import Hr from "./Hr.js";
import Aula03_exercicio from "./Aula03_exercicio.js";

const Aula03 = () => {
    // Definindo um vetor de turmas como fonte de dados para lista
    const turmas = [
        { id: 1, turma: '3ºA',pg: 10 },
        { id: 2, turma: '3ºB',pg: 8 },
        { id: 3, turma: '2ºA',pg: 6 },
        { id: 4, turma: '2ºB',pg: 2 }
    ]

    const exibirItensLista = ({ item }) => {
        return (
            <Text> {item.turma} </Text>
        )
    }

    const exibirItensListaInterclasse = ({ item }) => {
        return(
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding:10}}>
                <Text>{item.id}º</Text>
                <Text>Turma: {item.turma}º</Text>
                <Text>Pontos: {item.pg}º</Text>
            </View>
        )
    }

    return (
        <View>
            <Hr />
            <Text>Aula03 - Listas com FlatList</Text>
            <Text>aprendendo a maniplar listas em React Native</Text>
            <Hr />
            <Text>Lista de Turmas</Text>
            {
                turmas.map((linha) => (
                    <Text key={linha.id}>{linha.turma}</Text>
                ))
            }
            <Text> Lista com o FlatList</Text>
            {/* Componente FlatList para exibir dados. Este componente 
                é mais otimizado e eficiente para exibição de listas */}
            <FlatList
                data={turmas} //Passando o vetor de turmas para o FlatList como prop
                renderItem={exibirItensLista} //Função que "desenha/renderiza" os itens
                keyExtractor={(item) => {item.id}} //Função que gerencia as chaves únicas da lista
            />
            <Hr/>
            {/* Classificação do interclasse so SESI utilizando FlatList */}
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Interclasse Sesi - 2026</Text>
            <FlatList
                data={turmas} //Passando o vetor de turmas para o FlatList como prop
                renderItem={exibirItensListaInterclasse} //Função que "desenha/renderiza" os itens
                keyExtractor={(item) => {item.id}} //Função que gerencia as chaves únicas da lista
            />
            <Hr/>
            <Aula03_exercicio/>

        </View>
    )
}

export default Aula03