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
})

export default router;