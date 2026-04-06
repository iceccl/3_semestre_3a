import { Router } from "express";
import { BD } from "../../db.js";

const router = Router()

// listart transações, mostrando categorias e subcategorias
router.get('/transacoes', async(req, res) => {
    try {
        // Cria uma variavel para enviar o comando sql
        const comando = `
            SELECT
                t.id_transacao,
                t.valor,
                t.descricao,
                TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                t.tipo,
                c.nome AS nome_categoria,
                s.nome AS nome_subcategoria
            FROM
                transacoes t
            LEFT JOIN
                categorias c ON t.id_categoria = c.id_categoria
            LEFT JOIN
                sub_categorias s ON t.id_subcategoria = s.id_subcategoria
        `

        const transacao = await BD.query(comando)
        return res.status(200).json(transacao.rows)

    } catch (error) {
        console.error("Erro ao listar as transações, ", error.message);
        return res.status(500).json(`Erro interno no servidor, ${error.message}`)
    }
})

// Enviar novas transações.
router.post('/transacoes', async (req, res) => {
    const { valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria } = req.body
    try {
        const comando = `
            INSERT INTO 
                transacoes ( valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria )
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8)
        `
        const valores = [ valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria ]

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Transação cadastrada com sucesso!")
    } catch (error) {
        console.error("Erro ao enviar as transações, ", error.message);
        return res.status(500).json(`Erro interno no servidor, ${error.message}`)
    }
})


export default router;