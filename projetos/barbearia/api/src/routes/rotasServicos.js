import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

router.get("/servicos", async(req, res) => {
    try {
        const comando = `SELECT * FROM servicos ORDER BY id_servico`;


        const servicos = await BD.query(comando);

        return res.status(200).json(servicos.rows);
    } catch (error) {
        console.error("Erro ao listar servicos", error.message);
        return res.status(500).json({ error: "Erro ao listar servicos" });
    }
})

router.post("/servicos", async (req, res) => {
    const { nome, preco, descricao } = req.body;
    try {
        const comando = `INSERT INTO servicos(nome, preco, descricao) VALUES($1, $2, $3)`;
        const valores = [nome, preco, descricao];

        await BD.query(comando, valores);
        console.log(comando, valores)

        return res.status(201).json("Serviço cadastrado.");
    } catch (error) {
        console.error("Erro ao cadastrar serviço", error.message);
        return res.status(500).json({ error: "Erro ao cadastrar serviço" });
    }
}),

router.put("/servicos/:id_servico", async (req, res) => {
  // Id recebido via parametro
  const { id_servico } = req.params;

  // Dados do usuario recebido via Corpo da página
  const { nome, preco, descricao  } = req.body;
  try {
    //Verificar se o usuario existe
    const verificarServico = await BD.query(
      `SELECT * FROM servicos
            WHERE id_servico = $1`,
      [id_servico],
    );

    if (verificarServico.rows.length === 0) {
      return res.status(404).json({ message: "Categoria não encontrado" });
    }
    // Atualiza todos os campos da tabela(PUT Substituição completa)
    const comando = `UPDATE servicos SET nome = $1, preco = $2, descricao = $3 WHERE
        id_servico = $4`;
    const valores = [nome, preco, descricao, id_servico];
    await BD.query(comando, valores);

    return res.status(200).json("serviço foi atualizads com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar serviços", error.message);
    return res.status(500).json({ error: "Erro ao atualizar serviços" });
  }
});

router.delete("/servicos/:id_servico", async (req, res) => {
  const { id_servico } = req.params;
  try {
    //Executa o comando de delete
    const comando = `DELETE FROM servicos WHERE id_servico = $1`;
    await BD.query(comando, [id_servico]);
    return res.status(200).json({ message: "Serviço removido com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar servico", error.message);
    return res
      .status(500)
      .json({ message: "Erro interno so servidor" + error.message });
  }
});

export default router;