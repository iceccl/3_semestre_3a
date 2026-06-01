import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [dadosJogo, setDadosJogo] = useState({ opcoes: [] });
  const [respondido, setRespondido] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const novaRodada = async () => {
    try {
      setRespondido(false);
      setMensagem("");

      const resposta = await fetch("http://localhost:3000/jogo");
      const dados = await resposta.json();
      setDadosJogo(dados);
    } catch (erro) {
      console.log(erro);
      setMensagem("Erro ao conectar ao servidor, " + erro);
    }
  };

  const alternativa = (opcaoOriginal) => {
    const gabarito = dadosJogo.respostaCorreta;

    if (opcaoOriginal === gabarito) {
      setMensagem("Você acertou!");
    } else {
      setMensagem("Você errou :(");
    }
    setRespondido(true);
  };

  useEffect(() => {
    novaRodada();
  }, []);

  return <View style={styles.container}>
    <Text>De qual país é essa bandeira?</Text>
    <Image source={{url: dadosJogo.imagem}} style={styles.foto}/>

    {/* Opções das respostas */}
    <View style={styles.containerOpcoes}>
      {
        dadosJogo.opcoes.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.botaoAlternativa, respondido && styles.botaoDesabilitado]} onPress={() => alternativa(item)} disabled={respondido}>
            <Text style={styles.textoBotao}>{item}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
    {
      mensagem !== "" &&(
        <View style={[
          styles.cardFeedback,
          mensagem? styles.bgAcertou : styles.bgErrou
        ]}>
          <Text style={styles.textoFeedback}>{mensagem}</Text>
        </View>
      )
    }
    {
      respondido && (
        <TouchableOpacity style={styles.botaoProximo} onPress={novaRodada}>
          <Text style={styles.textoProximo}>Proxima questão</Text>
        </TouchableOpacity>
      )
    }
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  titulo: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  textoCarregando: { fontSize: 16, color: "#4B5563", fontWeight: "500" },
  foto: {
    width: 290,
    height: 180,
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    marginVertical: 15,
    elevation: 4,
  },
  containerOpcoes: { width: "100%", alignItems: "center", gap: 12 },
  botaoAlternativa: {
    width: "90%",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#3B82F6",
    borderRadius: 12,
    alignItems: "center",
    elevation: 1,
  },
  botaoDesabilitado: { borderColor: "#D1D5DB", opacity: 0.6 },
  textoBotao: { fontSize: 16, fontWeight: "600", color: "#1D4ED8" },
  cardFeedback: {
    width: "90%",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    elevation: 2,
  },
  bgAcertou: { backgroundColor: "#D1FAE5", borderColor: "#10B981" },
  bgErrou: { backgroundColor: "#FEE2E2", borderColor: "#EF4444" },
  textoFeedback: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
  },
  botaoProximo: {
    marginTop: 20,
    backgroundColor: "#10B981",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
  },
  textoProximo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
