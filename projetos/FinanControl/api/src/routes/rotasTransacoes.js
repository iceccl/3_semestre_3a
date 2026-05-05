import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

// listando transações, mostrando categorias e subcategorias
router.get("/transacoes", async (req, res) => {
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
        `;

    const transacao = await BD.query(comando);
    return res.status(200).json(transacao.rows);
  } catch (error) {
    console.error("Erro ao listar as transações, ", error.message);
    return res.status(500).json(`Erro interno no servidor, ${error.message}`);
  }
});

// Enviar novas transações.
router.post("/transacoes", async (req, res) => {
  const {
    valor,
    descricao,
    data_registro,
    data_vencimento,
    data_pagamento,
    tipo,
    id_categoria,
    id_subcategoria,
  } = req.body;
  try {
    const comando = `
            INSERT INTO 
                transacoes ( valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria )
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
    const valores = [
      valor,
      descricao,
      data_registro,
      data_vencimento,
      data_pagamento,
      tipo,
      id_categoria,
      id_subcategoria,
    ];

    await BD.query(comando, valores);
    console.log(comando, valores);

    return res.status(201).json("Transação cadastrada com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar as transações, ", error.message);
    return res.status(500).json(`Erro interno no servidor, ${error.message}`);
  }
});

// Listando transações por tipo (Entrada ou Saída)
router.get("/transacoes/tipo/:tipo", async (req, res) => {
  const { tipo } = req.params;
  try {
    if (tipo != "E" && tipo != "S") {
      return res
        .status(400)
        .json({ message: "Tipo inválido, use E para entrada ou S para saída" });
    }

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
            WHERE t.tipo = $1
            ORDER BY t.data_registro DESC
        `;

    const transacao = await BD.query(comando, [tipo]);
    return res.status(200).json(transacao.rows);
  } catch (error) {
    console.error("Erro ao listar as transações, ", error.message);
    return res
      .status(500)
      .json({ message: "Erro interno no servidor, " + error.message });
  }
});

// Busca por categoria
router.get("/transacao/categoria/:id_categoria", async (req, res) => {
  const { id_categoria } = req.params;
  try {
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
            WHERE c.categoria = $1
            ORDER BY t.data_registro DESC
        `;

    const transacao = await BD.query(comando, [id_categoria]);
    return res.status(200).json(transacao.rows);
  } catch (error) {
    console.error("Erro ao listar as transações, ", error.message);
    return res
      .status(500)
      .json({ message: "Erro interno no servidor, " + error.message });
  }
});

router.get("/transacoes/subcategoria/:id_subcategoria", async (req, res) => {
  const { id_subcategoria } = req.params;
  try {
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
            WHERE s.subcategoria = $1
            ORDER BY t.data_registro DESC
        `;

    const transacao = await BD.query(comando, [id_subcategoria]);
    return res.status(200).json(transacao.rows);
  } catch (error) {
    console.error("Erro ao listar as transações, ", error.message);
    return res
      .status(500)
      .json({ message: "Erro interno no servidor, " + error.message });
  }
});

// atualizando transacoes
router.put("/transacoes/id_transacao", async (req, res) => {
  const { id_transacao } = req.params;
  const {
    valor,
    descricao,
    data_registro,
    data_vencimento,
    data_pagamento,
    tipo,
    id_categoria,
    id_subcategoria,
  } = req.body;
  try {
    const verificarTransacao = await BD.query(
      `SELECT * FROM transacoes
            WHERE id_transacao = $1`,
      [id_transacao],
    );

    if (verificarTransacao.rows.length === 0) {
      return res.status(404).json({ message: "transacao não encontrado" });
    }
    // Atualiza todos os campos da tabela(PUT Substituição completa)
    const comando = `UPDATE transacoes SET valor = $1, descricao = $2, data_registro = $3, data_vencimento = $4, data_pagamento = $5, tipo = $6,  id_categoria = $7, id_subcategoria = $8 WHERE id_transacao = $9`;
    const valores = [valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria, id_transacao];
    await BD.query(comando, valores);

    return res.status(200).json("Transacao foi atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar transações", error.message);
    return res.status(500).json({ error: "Erro ao atualizar transações" });
  }
});
export default router;
