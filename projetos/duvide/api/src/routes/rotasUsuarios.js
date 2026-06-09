import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

const secretKey = 'duvide'


// Criando o endpoint para listar todos os usuarios
router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
        // cria uma variavel para enviar o comando sql
        const comando = `SELECT * FROM usuarios ORDER BY id_usuario`

        // Cria uma variavel para receber o retorno do sql
        const usuarios = await BD.query(comando);

        // retorno para pagina, o json com os dados 
        // buscando do sql
        console.log(usuarios.rows);
        return res.status(200).json(usuarios.rows); //200 ok

    } catch (error) {
        console.error('Erro ao listar usários', error.message);
        return res.status(500).json({ error: 'Erro ao listar usuarios' })
    }
})

// Endpoint seguro contra sql injection
router.post('/usuarios', async (req, res) => {
    const { id_usuario, email, senha, nome, materia, tipo } = req.body;
    try {
        // definindo a força da criptografia
        const saltRounds = 10
        // gerando o hash da senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)

        const comando = `INSERT INTO usuarios (email, senha, nome, materia, tipo) VALUES($1,
        $2, $3, $4, $5)`

        const valores =  [email, senhaCriptografada, nome, materia, tipo];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Usuário cadastrado!");
    } catch (error) {
        console.error('Erro ao cadastrar usuários', error.message)
        return res.status(500).json({ error: 'Erro ao cadastrar usuários' })

    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o usuario
router.put('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    // Id recebido via parametro
    const { id_usuario } = req.params;

    //  Dados do usuario recebido via Corpo da página 
    const { email, nome, senha, materia, tipo } = req.body;
    try {
        // verificar se o usuario recebido via corpo da página
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios
            WHERE id_usuario = $1`, [id_usuario])
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        // Atualiza todos os campos da tabela (PUT Substituição completa)
        const comando = `UPDATE usuarios SET email = $1, nome = $2,
        senha = $3, materia = $4, tipo =$5 WHERE
        id_usuario = $6`;
        const valores = [email, nome, senha, materia, tipo, id_usuario];
        await BD.query(comando, valores);

        return res.status(200).json('Usuário foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuários' })
    }
})

// Rota patch atualizando parcialmente as informações
router.patch('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    const { email, senha, nome, materia, tipo } = req.body;

    try {
        // Verificar se o usuario existe
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios
            WHERE id_usuario = $1`, [id_usuario])
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário nao encontrado' })
        }
        // Montar o update inamicamente(apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (email !== undefined) {
            campos.push(`email = $${contador}`);
            valores.push(nome);
            contador++;
        }
        if (senha !== undefined) {
            campos.push(`senha = $${contador}`);
            valores.push(senha);
            contador++;
        }
        if (nome !== undefined) {
            campos.push(`nome = $${contador}`);
            valores.push(nome);
            contador++;
        }
        if (materia !== undefined) {
            campos.push(`materia = $${contador}`);
            valores.push(materia);
            contador++;
        }
        if (tipo !== undefined) {
            campos.push(`tipo = $${contador}`);
            valores.push(tipo);
            contador++;
        }

        //se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" })
        }
        //Adicionando ID ao final de valores
        valores.push(id_usuario)

        //montando a query dinamicamente
        const comando = `UPDATE USUARIOS SET ${campos.join(', ')} WHERE id_usuario = $${contador}`
        await BD.query(comando, valores)

        return res.status(200).json('Usuário atualizado com sucesso');

     } catch(error){
        console.error('Erro ao atualizar usuario', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }

})

router.delete('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    try{
        //Executa o comando de delete
        const comando = `DELETE FROM usuarios WHERE id_usuario = $1`
        await BD.query(comando, [id_usuario])
        return res.status(200).json({ message: "Usuario removido com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar usuario', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    console.log(email, senha)
    try {
        //buscar usuario pelo email
        const comando = 'SELECT * FROM usuarios WHERE email = $1';
        const resultado = await BD.query(comando, [email])

        if (resultado.rows.length === 0) {
            return res.status(401).json({ message: 'email incorreto' })
        }
        const usuario = resultado.rows[0]

        console.log(usuario, "usuario");
        
        
        //Comparar a senha enviada com a senha gravada no banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Senha incorreta' })
        }

        const token = jwt.sign({ id_usuario: usuario.id_usuario, nome: usuario.nome },
            secretKey,
            // { expiresIn: '15minutes' }
        )
        //Login realizado com sucesso
        
        return res.status(200).json({
            message: 'Login realizado',
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome
            },
            token: token
        })
    } catch (error) {
        console.error('Erro ao realizar login', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

router.delete('/usuarios/:id', async (req, res) => {
    const { id_usuario } = req.params;
    try{
        // Verifica se o usuario esxiste antes de tentar deletar
        const verificarUsuario = await BD.query(`SELECT id_usuario FROM usuarios WHERE id_usuario =
            $1`, [id_usuario]);
            if (verificarUsuario.rows.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            // Executa o comando delete
            const comando = `DELETE FROM usuarios WHERE id_usuario = $1`;
            await BD.query(comando, [id_usuario]);
            // Retorna com sucesso
            return res.status(200).json({ message: 'Usuário removido com sucesso' });
    }catch (error) {
        console.error('Erro ao deletar usuário', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor ao tentar deletar' })
    }
})

export default router;




