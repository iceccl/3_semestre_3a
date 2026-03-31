import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos os categorias
router.get("/subCategorias", async (req, res) => {
  try {
    //cria uma variavel para enviar o comando sql
    const comando = `SELECT * FROM sub_categorias ORDER BY id_subcategoria`;

    //cria uma variavel para receber o retorno do sql
    const categorias = await BD.query(comando);

    //retorno para a pagina, o json com os dados
    //buscados do sql
    return res.status(200).json(categorias.rows); //200 ok
  } catch (error) {
    console.error("Erro ao listar as sub categorias", error.message);
    return res.status(500).json({ error: "Erro ao listar as sub categorias" });
  }
});

export default router;