import { Router } from "express";
import { BD } from "../../bd.js";

const router = Router()

router.get('/quiz', async(req, res) => {
    try {
        const comando = 'SELECT * FROM quiz'
        const resultado = await BD.query(comando)
        const todasQuestoes = resultado.rows

        // validar a condição se existe as questões cadastradas
        if (todasQuestoes.length == 0) {
            return res.status(404).json({message: 'nenhuma questão cadastrada'})
        }

        const indice = Math.floor(Math.random() * todasQuestoes.length)
        const perguntaSorteada = todasQuestoes[indice]

        const opcoes = [
            perguntaSorteada.opcao1,
            perguntaSorteada.opcao2,
            perguntaSorteada.opcao3,
            perguntaSorteada.opcao4,
        ]

        return res.status(200).json({
          // chave        valor
            pergunta: perguntaSorteada.pergunta,
            imagem: perguntaSorteada.foto,
            opcoes: opcoes,
            respostaCorreta: perguntaSorteada.resposta
        })
    } catch (erro) {
        return res.status(500).json({erro: "Erro ao listar questões, " + erro})
    }
})

export default router;