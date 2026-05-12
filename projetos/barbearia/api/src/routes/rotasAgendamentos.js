import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

router.get("/agendamentos", async (req, res) => {
    try {
        const comando = `
            SELECT 
                a.id_agendamento,
                a.status,
                TO_CHAR(a.data_hora, 'DD/MM/YYYY') AS data_hora,
                s.nome AS nome_servico,
                u.nome AS nome_usuario
            FROM
                agendamentos a
            LEFT JOIN
                servicos s ON a.id_servico = s.id_servico
            LEFT JOIN
                usuarios u ON a.id_usuario = u.id_usuario
        `;

        const agendamento = await BD.query(comando);
        return res.status(200).json(agendamento.rows)
    } catch (error) {
        console.error("Erro ao listar os agendamentos, ", error.message)
        return res.status(500).json(`Erro interno no servidor, ${error.message}`)
    }
})

router.post("/agendamentos", async (req, res) => {
    try {
        const comando = `
            INSERT INTO agendamentos(data_hora, status, id_servico, id_usuario)
            VALUES  ($1, $2, $3, $4)
        `
        const valores = [data_hora, status, id_servico, id_usuario];
        await BD.query(comando, valores)
        return res.status(201).json({
            message: "Dados enviados com sucesso!"
        })
    } catch (error) {
        console.error("Erro ao enviar dados: ", error.message);
        return res.status(500).json({
            error: "Erro ao enviar dados"
        })
        
    }
});

router.put("/agendamentos/:id_agendamento", async (req, res) => {
  // Id recebido via parametro
  const { id_agendamento } = req.params;

  // Dados do usuario recebido via Corpo da página
  const { data_hora, status, id_servico, id_usuario } = req.body;
  try {
    //Verificar se o usuario existe
    const verificarAgendamento = await BD.query(
      `SELECT * FROM agendamentos
            WHERE id_agendamento = $1`,
      [id_agendamento],
    );
    if (verificarAgendamento.rows.length === 0) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }
    // Atualiza todos os campos da tabela(PUT Substituição completa)
    const comando = `UPDATE agendamentos SET data_hora = $1, status = $2, id_servico = $3, id_usuario = $4 WHERE
        id_usuario = $5`;
    const valores = [data_hora, status, id_servico, id_usuario];
    await BD.query(comando, valores);

    return res.status(200).json("Agendamento foi atualizado!");
  } catch (error) {
    console.error("Erro ao atualizar Agendamento", error.message);
    return res.status(500).json({ error: "Erro ao atualizar Agendamento" });
  }
});

router.delete("/agendamentos/:id_agendamento", async (req, res) => {
  const { id_agendamento } = req.params;
  try {
    //Executa o comando de delete
    const comando = `DELETE FROM agendamentos WHERE id_agendamento = $1`;
    await BD.query(comando, [id_agendamento]);
    return res.status(200).json({ message: "Agendamento removido com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar agendamento", error.message);
    return res
      .status(500)
      .json({ message: "Erro interno so servidor" + error.message });
  }
});

export default router