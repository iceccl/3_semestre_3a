import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from "bcrypt"

const router = Router();

// Método GET
router.get("/usuarios", async(req, res) => {
    try {
        const query = `SELECT * FROM usuarios ORDER BY id_usuario`;

        const usuarios = await BD.query(query);

        return res.status(200).json(usuarios.rows)
    } catch (error) {
        console.error("Erro ao listar usuários, ", error.message)
        return res.status(500).json({ error: "Erro ao listar usuários"})
    }
})

// método POST
router.post("/usuarios", async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  try {
    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    const comando = `INSERT INTO USUARIOS(nome, email, tipo, senha) VALUES($1, $2, $3, $4)`;
    const valores = [nome, email, tipo, senhaCriptografada];

    await BD.query(comando, valores);
    console.log(comando, valores);

    return res.status(201).json("Usuário cadastrado.");
  } catch (error) {
    console.error("Erro ao cadastrar usuários", error.message);
    return res.status(500).json({ error: "Erro ao cadastrar usuarios" });
  }
});

// exportando as rotas
export default router;