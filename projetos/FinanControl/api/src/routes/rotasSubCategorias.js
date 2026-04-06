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

// Cadastrando uma sub categoria
router.post('/subCategorias', async (req, res) => {
  const { nome, ativo, id_categoria } = req.body
  try {
    const comando = `
      INSERT INTO 
        sub_categorias (nome, ativo, id_categoria)
      VALUES
        ($1, $2, $3)
    `
    const valores = [nome, ativo, id_categoria]

    await BD.query(comando, valores)

    return res.status(201).json("Sub categoria cadastrada com sucesso!")
  } catch (error) {
    console.error("Erro ao cadastrar sub categoria, ", error.message)
    return res.status(500).json(error.message)
  }
})

// atualizando sub categoria
router.put('/subCategorias/:id_subcategoria', async (req, res) => {
  const { id_subcategoria } = req.params
  const { nome, ativo, id_categoria } = req.body
  try {
    //Verificar se a sub categoria existe
    const verificarSubCategoria = await BD.query(
      `SELECT * FROM sub_categorias
            WHERE id_subcategoria = $1`,
      [id_subcategoria]
    );

    if (verificarSubCategoria.rows.length === 0) {
      return res.status(404).json({ message: "Categoria não encontrado" });
    }
    // Atualiza todos os campos da tabela(PUT Substituição completa)
    const comando = `UPDATE sub_categorias SET nome = $1, ativo = $2, id_categoria = $3 WHERE id_subcategoria = $4`;
    const valores = [ nome, ativo, id_categoria, id_subcategoria ];
    await BD.query(comando, valores);

    return res.status(200).json("categoria foi atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar sub categoria", error.message);
    return res.status(500).json({ error: "Erro ao atualizar sub categoria" });
  }
})

export default router;