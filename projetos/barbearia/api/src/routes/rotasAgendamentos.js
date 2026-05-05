import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

router.get("/agendamentos", async (req,res) => {
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
        console.error("Erro ao listar os agendamentos, ", error.messsage)
        return res.status(500).json(`Erro interno no servidor, ${error.messsage}`)
    }
})

export default router