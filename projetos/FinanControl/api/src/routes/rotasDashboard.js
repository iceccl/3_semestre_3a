import { Router } from "express";
import { BD } from "../../db.js"
import jwt from "jsonwebtoken";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();
const SECRET_KEY = "minha_chave_secreta";

// Rota única para o Dashboard
router.get('/dashboard', async(req, res) => {
    try {
        // Buscar resumo do mês atual
        // date_trunc recebe a partir do mês
        const resumoMes = `
            SELECT 
                SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) as entradas,
                SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) as saidas,
                SUM(CASE WHEN tipo = 'E' THEN valor ELSE -valor END) as saldo
            FROM transacoes
            WHERE DATE_TRUNC('month', data_registro) = DATE_TRUNC('month', CURRENT_DATE)
        `
        // gastos por categoria - gráfico de pizza
        const gastosCategorias = `
            SELECT c.nome, SUM(t.valor) as total
            FROM transacoes t
            INNER JOIN categorias c ON t.id_categoria = c.id_categoria
            WHERE t.tipo = 'S'
            GROUP BY c.nome
            ORDER BY total DESC
        `

        // Maiores despesas do mês
        const maioresGastos = `
            SELECT descricao, valor, TO_CHAR(data_registro, 'DD/MM/YYYY') as data
            FROM transacoes
            WHERE tipo = 'S'
            ORDER BY valor DESC
            LIMIT 5
        `

        // Ultimas movimentações do extrato
        const ultimasTransacoes = `
            SELECT descricao, valor, TO_CHAR(data_registro, 'DD/MM/YYYY') as data
            FROM transacoes
            ORDER BY data DESC
            LIMIT 5
        `
        const evolucao = `
            SELECT
                TO_CHAR (data_registro, 'MM/YYYY') as mes,
                SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) as entradas,
                SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) as saidas
            FROM trasacoes
            GROUP BY TO_CHAR(data_registro, 'MM/YYYY'), DATE_TRUNC('month', data_registro)
            ORDER BY DATE_TRUNC('month', data_registro) ASC
        `

        const resGastosCategorias = await BD.query(gastosCategorias)
        const resMaioresGastos = await BD.query(maioresGastos)
        const resResumo = await BD.query(resumoMes)
        const resUltimasTransacoes = await BD.query(ultimasTransacoes)
        const resEvolucao = await BD.query(evolucao)

        const dadosDashboard = {
            resumoMesAtual: resResumo.rows[0],
            resumoCategorias: resGastosCategorias.rows,
            resumoMaioresGastos: resMaioresGastos.rows,
            resumoUltimasTransacoes: resUltimasTransacoes.rows,
            resultadoEvolucao: resEvolucao.rows
        }

        return res.status(200).json(dadosDashboard);
    } catch (error) {
        return res.status(500).json({error: 'Erro no servidor'})
    }
})

export default router;