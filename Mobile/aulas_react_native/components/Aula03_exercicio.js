import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import Hr from "./Hr.js";

const Aula03_exercicio = () => {
    const listaAlunos = [
        {id: 1,nome: "joão", nota: 8.5, faltas: 2},
        {id: 2,nome: "Maria", nota: 9.0, faltas: 4},
        {id: 3,nome: "Caroline", nota: 10.0, faltas: 0},
        {id: 4,nome: "Henrique", nota: 7.5, faltas: 4},
    ]

    const listaProdutos = [
        {id: 1, nome: "Guitarra elétrica", categoria: 'Instrumentos musicais', preco: '900R$', estoque: 100},
        {id: 2, nome: "Guitarra elétrica", categoria: 'Instrumentos musicais', preco: '900R$', estoque: 100},
        {id: 3, nome: "Guitarra elétrica", categoria: 'Instrumentos musicais', preco: '900R$', estoque: 100},
        {id: 4, nome: "Guitarra elétrica", categoria: 'Instrumentos musicais', preco: '900R$', estoque: 100},
    ]

    const exibirListaAlunos = ({ item }) => {
        return(
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding:10}}>
                <Text>Id: {item.id}</Text>
                <Text>Nome: {item.nome}</Text>
                <Text>Nota: {item.nota}</Text>
                <Text>Faltas: {item.faltas}</Text>
            </View>
        )
    }

    const exibirListaProdutos = ({ item }) => {
        return(
            <View style={estilos.card}>
                <Image source={ require ("../assets/Logo.jpg")} style={{ width: 50, height: 50}}/>
                <Text>Id: {item.id}</Text>
                <Text>Nome: {item.nome}</Text>
                <Text>Categoria: {item.categoria}</Text>
                <Text>Preço: {item.preco}</Text>
                <Text>Estoque: {item.estoque}</Text>
            </View>
        )
    }

    return(
        <View>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Lista alunos</Text>
            <FlatList
                data={listaAlunos}
                renderItem={exibirListaAlunos}
                keyExtractor={(item) => {item.id}}
            />
            <Hr/>
            <FlatList
                data={listaProdutos}
                renderItem={exibirListaProdutos}
                keyExtractor={(item) => {item.id}}
            />
        </View>
    )
}

const estilos = StyleSheet.create({ 
    card: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,

    }
 })

export default Aula03_exercicio