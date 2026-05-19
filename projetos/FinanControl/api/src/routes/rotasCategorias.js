import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos os categorias
router.get("/categorias", async (req, res) => {
  try {
    //cria uma variavel para enviar o comando sql
    const comando = `SELECT * FROM categorias ORDER BY id_categoria`;

    //cria uma variavel para receber o retorno do sql
    const categorias = await BD.query(comando);

    //retorno para a pagina, o json com os dados
    //buscados do sql
    return res.status(200).json(categorias.rows); //200 ok
  } catch (error) {
    console.error("Erro ao listar categorias", error.message);
    return res.status(500).json({ error: "Erro ao listar categorias" });
  }
});

//Endpoint seguro contra sql Injection
router.post("/categorias", async (req, res) => {
  const { nome, descricao, cor, icone, tipo } = req.body;
  try {

    const comando = `INSERT INTO categorias(nome, descricao, cor, icone, tipo) VALUES($1, $2, $3, $4, $5)`;
    const valores = [nome, descricao, cor, icone, tipo];

    await BD.query(comando, valores);
    console.log(comando, valores);

    return res.status(201).json("Categoria cadastrada.");
  } catch (error) {
    console.error("Erro ao cadastrar categorias", error.message);
    return res.status(500).json({ error: "Erro ao cadastrar categorias" });
  }
});

// endpoint para atualizar um unico Categoria
// recebendo o parametro pelo id e buscando o usuario
router.put("/categorias/:id_categoria", async (req, res) => {
  // Id recebido via parametro
  const { id_categoria } = req.params;

  // Dados do usuario recebido via Corpo da página
  const { nome, descricao, cor, icone, tipo } = req.body;
  try {
    //Verificar se o usuario existe
    const verificarCategoria = await BD.query(
      `SELECT * FROM categorias
            WHERE id_categoria = $1`,
      [id_categoria],
    );

    if (verificarCategoria.rows.length === 0) {
      return res.status(404).json({ message: "Categoria não encontrado" });
    }
    // Atualiza todos os campos da tabela(PUT Substituição completa)
    const comando = `UPDATE categorias SET nome = $1, descricao = $2, cor = $3, icone = $4, tipo = $5 WHERE
        id_categoria = $6`;
    const valores = [nome, descricao, cor, icone, tipo, id_categoria];
    await BD.query(comando, valores);

    return res.status(200).json("categoria foi atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar categorias", error.message);
    return res.status(500).json({ error: "Erro ao atualizar categorias" });
  }
});

//Rota patch atualizando parcialmente as informações
router.patch("/categorias/:id_categoria", async (req, res) => {
  const { id_categoria} = req.params;
  const { nome, descricao, cor, icone, tipo } = req.body;

  try {
    //Verificar se o usuario existe
    const verificarCategoria = await BD.query(
      `SELECT * FROM categorias
            WHERE id_categoria = $1`,
      [id_categoria],
    );
    if (verificarCategoria.rows.length === 0) {
      return res.status(404).json({ message: "Categoria não encontrado" });
    }

    //Montar o update dinamicamente(apenas campos enviados)
    const campos = [];
    const valores = [];
    let contador = 1;

    if (nome !== undefined) {
      campos.push(`nome = $${contador}`);
      valores.push(nome);
      contador++;
    }
    if (descricao !== undefined) {
      campos.push(`descricao = $${contador}`);
      valores.push(descricao);
      contador++;
    }
    if (cor !== undefined) {
      campos.push(`cor = $${contador}`);
      valores.push(cor);
      contador++;
    }
    if (icone !== undefined) {
      campos.push(`icone = $${contador}`);
      valores.push(icone);
      contador++;
    }
    if (tipo !== undefined) {
      campos.push(`tipo = $${contador}`);
      valores.push(tipo);
      contador++;
    }

    //se nenhum campo foi enviado
    if (campos.length === 0) {
      return res.status(400).json({ message: "Nenhum campo a atualizar" });
    }

    //Adicionando ID ao final de valores
    valores.push(id_categoria);

    //montando a query dinamicamente
    const comando = `UPDATE categorias SET ${campos.join(", ")} WHERE id_categoria = $${contador}`;
    await BD.query(comando, valores);

    return res.status(200).json("Categoria atualizado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar categoria, ", error.message);
    return res
      .status(500)
      .json({ message: "Erro interno so servidor, " + error.message });
  }
});

router.delete("/categorias/:id_categoria", async (req, res) => {
  const { id_categoria } = req.params;
  try {
    //Executa o comando de delete
    const comando = `DELETE FROM categorias WHERE id_categoria = $1`;
    await BD.query(comando, [id_categoria]);
    return res.status(200).json({ message: "Categoria removido com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar categoria", error.message);
    return res
      .status(500)
      .json({ message: "Erro interno so servidor" + error.message });
  }
});

// router.post("/login", async (req, res) => {
//   const { email, senha } = req.body;
//   try {
//     //buscar usuario pelo email
//     const comando = "SELECT * FROM usuarios WHERE email = $1";
//     const resultado = await BD.query(comando, [email]);
//     if (resultado === 0) {
//       return res.status(401).json({ message: "email incorreto" });
//     }
//     const usuario = resultado.rows[0];

//     //Comparar a senha enviada com a senha gravada no banco
//     const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
//     if (!senhaCorreta) {
//       return res.status(401).json({ message: "Senha incorreta" });
//     }
//     //Login realizado com sucesso
//     return res.status(200).json({
//       message: "Login realizado",
//       usuario: { id_usuario: usuario.id_usuario, nome: usuario.nome },
//     });
//   } catch (error) {
//     console.error("Erro ao realizar login", error.message);
//     return res
//       .status(500)
//       .json({ message: "Erro interno so servidor" + error.message });
//   }
// });

export default router;
