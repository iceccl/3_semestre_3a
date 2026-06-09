import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

const secretKey = 'duvide'

// Listar todas as perguntas
router.get('/perguntas', autenticarToken, async (req, res) => {
    try {
        const comando = `
            SELECT * FROM perguntas
            ORDER BY id_pergunta
        `;

        const perguntas = await BD.query(comando);

        return res.status(200).json(perguntas.rows);

    } catch (error) {
        console.error('Erro ao listar perguntas:', error.message);
        return res.status(500).json({
            error: 'Erro ao listar perguntas'
        });
    }
});

// Buscar pergunta por ID
router.get('/perguntas/:id_pergunta', async (req, res) => {
    const { id_pergunta } = req.params;

    try {
        const comando = `
            SELECT * FROM perguntas
            WHERE id_pergunta = $1
        `;

        const resultado = await BD.query(comando, [id_pergunta]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                message: 'Pergunta não encontrada'
            });
        }

        return res.status(200).json(resultado.rows[0]);

    } catch (error) {
        console.error('Erro ao buscar pergunta:', error.message);
        return res.status(500).json({
            error: 'Erro ao buscar pergunta'
        });
    }
});

// Cadastrar pergunta
router.post('/perguntas', autenticarToken, async (req, res) => {
    const { mensagem, modo_anonimo, data_envio, resposta, data_resposta } = req.body;

    try {
        const comando = `
            INSERT INTO perguntas
            (mensagem, modo_anonimo, data_envio, resposta, data_resposta)
            VALUES ($1, $2, $3, $4, $5)
        `;

        const valores = [ mensagem, modo_anonimo, data_envio, resposta, data_resposta ];

        await BD.query(comando, valores);

        return res.status(201).json({
            message: 'Pergunta cadastrada com sucesso'
        });

    } catch (error) {
        console.error('Erro ao cadastrar pergunta:', error.message);
        return res.status(500).json({
            error: 'Erro ao cadastrar pergunta'
        });
    }
});

// Atualização completa
router.put('/perguntas/:id_pergunta', autenticarToken, async (req, res) => {
    const { id_pergunta } = req.params;

    const { mensagem, modo_anonimo, data_envio, resposta, data_resposta } = req.body;

    try {
        const verificarPergunta = await BD.query(
            `SELECT * FROM perguntas WHERE id_pergunta = $1`,
            [id_pergunta]
        );

        if (verificarPergunta.rows.length === 0) {
            return res.status(404).json({
                message: 'Pergunta não encontrada'
            });
        }

        const comando = `
            UPDATE perguntas
            SET
                mensagem = $1,
                modo_anonimo = $2,
                data_envio = $3,
                resposta = $4,
                data_resposta = $5
            WHERE id_pergunta = $6
        `;

        const valores = [ mensagem, modo_anonimo, data_envio, resposta, data_resposta, id_pergunta];

        await BD.query(comando, valores);

        return res.status(200).json({
            message: 'Pergunta atualizada com sucesso'
        });

    } catch (error) {
        console.error('Erro ao atualizar pergunta:', error.message);
        return res.status(500).json({
            error: 'Erro ao atualizar pergunta'
        });
    }
});

// Atualização parcial
router.patch('/perguntas/:id_pergunta', autenticarToken, async (req, res) => {
    const { id_pergunta } = req.params;

    const { mensagem,modo_anonimo,data_envio, resposta, data_resposta} = req.body;

    try {
        const verificarPergunta = await BD.query(
            `SELECT * FROM perguntas WHERE id_pergunta = $1`,
            [id_pergunta]
        );

        if (verificarPergunta.rows.length === 0) {
            return res.status(404).json({
                message: 'Pergunta não encontrada'
            });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (mensagem !== undefined) {
            campos.push(`mensagem = $${contador}`);
            valores.push(mensagem);
            contador++;
        }

        if (modo_anonimo !== undefined) {
            campos.push(`modo_anonimo = $${contador}`);
            valores.push(modo_anonimo);
            contador++;
        }

        if (data_envio !== undefined) {
            campos.push(`data_envio = $${contador}`);
            valores.push(data_envio);
            contador++;
        }

        if (resposta !== undefined) {
            campos.push(`resposta = $${contador}`);
            valores.push(resposta);
            contador++;
        }

        if (data_resposta !== undefined) {
            campos.push(`data_resposta = $${contador}`);
            valores.push(data_resposta);
            contador++;
        }

        if (campos.length === 0) {
            return res.status(400).json({
                message: 'Nenhum campo enviado para atualização'
            });
        }

        valores.push(id_pergunta);

        const comando = `
            UPDATE perguntas
            SET ${campos.join(', ')}
            WHERE id_pergunta = $${contador}
        `;

        await BD.query(comando, valores);

        return res.status(200).json({
            message: 'Pergunta atualizada com sucesso'
        });

    } catch (error) {
        console.error('Erro ao atualizar pergunta:', error.message);
        return res.status(500).json({
            error: 'Erro ao atualizar pergunta'
        });
    }
});

// Deletar pergunta
router.delete('/perguntas/:id_pergunta', autenticarToken, async (req, res) => {
    const { id_pergunta } = req.params;

    try {
        const verificarPergunta = await BD.query(
            `SELECT * FROM perguntas WHERE id_pergunta = $1`,
            [id_pergunta]
        );

        if (verificarPergunta.rows.length === 0) {
            return res.status(404).json({
                message: 'Pergunta não encontrada'
            });
        }

        await BD.query(
            `DELETE FROM perguntas WHERE id_pergunta = $1`,
            [id_pergunta]
        );

        return res.status(200).json({
            message: 'Pergunta removida com sucesso'
        });

    } catch (error) {
        console.error('Erro ao deletar pergunta:', error.message);
        return res.status(500).json({
            error: 'Erro ao deletar pergunta'
        });
    }
});

export default router;