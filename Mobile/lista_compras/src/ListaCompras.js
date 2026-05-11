// Imports
import { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Image, StatusBar } from "react-native"
import Estilos, { corPrincipal, corSecundaria, corTextos, corFundo, corFundo2, corPlaceholder } from "./Estilos.js"
import { MaterialIcons } from '@expo/vector-icons'
import {firestore} from '../firebase.config'
import { collection, addDoc, getDocs, query, doc, updateDoc, deleteDoc, where, orderBy } from 'firebase/firestore'

// App principal
const ListaCompras = () => {
    // Variável de estado para o item que irei incluir na lista
    const [item, setItem] = useState('')
    const [listaCompras, setListaCompras] = useState([])

    async function buscarDados() {
        // Representa um SELECT * FROM
        const comando = query(collection(firestore, 'compras Lyuz'))
        const dadosBD = await getDocs(comando)

        const novaLista = dadosBD.docs.map( (doc) => ({ 
            id: doc.id, ...doc.data()
        }))
        
        setListaCompras(novaLista)
    }
    
    useEffect( () => {
        buscarDados()
    }, [])

    // Função para desenhar or itens na lista
    const exibirItens = ( {item} ) => {
        return(
            <TouchableOpacity style={Estilos.botaoItem}>
                <Text style={item.comprado == false? Estilos.textoBotaoItem : Estilos.textoBotaoItemComprado} onPress={() => boatoAtualizar(item)}>{item.produto}</Text>
                <MaterialIcons name='delete-outline' size={24} color={corPrincipal} onPress={() => botaoExcluir(item.id)}/>
            </TouchableOpacity>
        )
    }

    const botaoAdicionar = async () => {
        // criando novo objeto do produto que estou adicionando
        const novoItem = {
            // date.now armazena a data atual (em formato de número int), não se repete.
            produto: item,
            comprado: false
        }

        const docRef = await addDoc(collection(firestore, 'compras Lyuz'), novoItem)
        console.log(docRef)

        // atribuo uma nova lista à lista que estou exibindo no app
        setItem('')
        buscarDados()
    }

    async function botaoExcluir(id) {
        await deleteDoc(doc(firestore, "compras Lyuz", id))
        buscarDados()
    }

    async function boatoAtualizar(item) {
        const docRef = doc(firestore, 'compras Lyuz', item.id)
        await updateDoc(docRef, {comprado: !item.comprado})
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