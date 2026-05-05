// Imports
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Image, StatusBar } from "react-native"
import Estilos, { corPrincipal, corSecundaria, corTextos, corFundo, corFundo2, corPlaceholder } from "./Estilos.js"
import { MaterialIcons } from '@expo/vector-icons'

// App principal
const ListaCompras = () => {
    // Variável de estado para o item que irei incluir na lista
    const [item, setItem] = useState('')
    const [listaCompras, setListaCompras] = useState([
        { id: 1, produto: '1 cartela de ovos🥚', comprado: false },
        { id: 2, produto: '2 nikitos de morango🍪', comprado: true },
    ])
    
    // Função para desenhar or itens na lista
    const exibirItens = ( {item} ) => {
        return(
            <TouchableOpacity style={Estilos.botaoItem}>
                <Text style={Estilos.textoBotaoItem}>{item.produto}</Text>
                <MaterialIcons name='delete-outline' size={24} color={corPrincipal}/>
            </TouchableOpacity>
        )
    }

    const botaoAdicionar = () => {
        // criando novo objeto do produto que estou adicionando
        const novoItem = {
            // date.now armazena a data atual (em formato de número int), não se repete.
            id: Date.now(),
            produto: item,
            comprado: false
        }

        // Criando uma nova lista mantendo tudo da lista atual e acrescentando o novo item
        const novaLista = {...listaCompras, novoItem}

        // atribuo uma nova lista à lista que estou exibindo no app
        setListaCompras(novaLista)
        setItem('')
    }

    return (
        <View style={Estilos.conteudo}>
            <StatusBar backgroundColor={corFundo} barStyle='light-content' />
            <View style={Estilos.header}>
                <Image source={require ('../assets/logo_lista_compras.png')} style={Estilos.logo} />
            </View>

            <View style={Estilos.corpo}>
                <View style={Estilos.inputContainer}>
                    <TextInput
                        placeholder="Adicione um novo item na lista"
                        style={Estilos.input}
                        value={item} onChangeText={setItem}
                        placeholderTextColor={corPlaceholder}
                    />

                    <TouchableOpacity style={Estilos.botao} onPress={botaoAdicionar}>
                        <Text style={Estilos.textoBotao}>+</Text>
                    </TouchableOpacity>
                </View>
            
            {/* Lista dos produtos */}
            <FlatList
                // no atributo data enviamos o vetor de dados da lista
                data={ listaCompras }
                // no atributo renderItem enviamos a função que desenha o item
                renderItem={exibirItens}
                // no atributo keyExtractor precisamos enviar um id único
                keyExtractor={(item) => item.id}
            />
            </View>

        </View>
    )
}

export default ListaCompras;