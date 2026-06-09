import { response } from "express";

const documentacao = {
  openapi: "3.0.3",
  info: {
    title: "API Duvide",
    description: "Documentação da API do sistema Duvide",
    version: "1.0.0",
  },
  servers: [
    { url: "http://localhost:3000", description: "localhost" },
    // {url: 'https://api-henna-nine-79.vercel.app', description: "Vercel"}
  ],
  tags: [
    {
      name: "Usuários",
      description: "Operações relacionadas a tabela de usuários",
    },
    {
      name: "Perguntas",
      description: "Operações relacionada a tabela de perguntas",
    },
  ],
  paths: {
    "/usuarios": {
      get: {
        tags: ["Usuários"],
        summary: "Listar todos os usuários",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Listar_Usuarios" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Usuários"],
        summary: "Cadastrar novo usuário",
        description:
          "Recebe nome, email, senha, tipo, matéria (opcional) para cadastrar novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cadastrar_Usuario",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuário cadastrado com sucesso!",
          },
          500: {
            description: "Erro interno no servidor",
          },
        },
      },
    },
    "/usuarios/{id_usuario}": {
      put: {
        tags: ["Usuários"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: "Atualizar todos os dados do usuário",
        description:
          "Atualiza todos os dados de um usuário existente, é necessário enviar todos os campos",
        parameters: [
          {
            name: "id_usuario",
            in: "path",
            required: true,
            description: "ID do usuário a ser atualizado",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizar_Usuario" },
              example: {
                nome: "Lyuz Anthony",
                email: "lyuz@gmail.com",
                senha: "senhaAtualizada",
                materia: "",
                tipo: "Aluno",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário atualizado com sucesso!",
          },
          404: {
            description: "Usuário não encontrado",
            content: {
              "application/json": {
                example: { message: "Usuário não encontrado" },
              },
            },
          },
          500: {
            description: "Erro interno no servidor",
          },
        },
      },
      delete: {
        tags: ["Usuários"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: "Remover Usuário",
        description: "Remove usuário existente",
        parameters: [
          {
            name: "id_usuario",
            in: "path",
            required: true,
            description: "ID do usuário",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "Usuário removido com sucesso!",
          },
          404: {
            description: "Usuário não encontrado",
            content: {
              "application/json": {
                example: { message: "Usuário não encontrado" },
              },
            },
          },
          500: {
            description: "Erro interno no servidor",
          },
        },
      },
    },
    "/login": {
      post: {
        tags: ["Autenticação"],
        summary: "Realizar Login",
        description: "Autentica um usuário e retorna id e nome",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Login_Usuario",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login realizado com sucesso!",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Resposta_Login",
                },
              },
            },
          },
          400: { description: "Email e senha são obrigatorios" },
          401: { description: "Credenciais inválidas" },
          500: {
            description: "Erro interno no servidor",
          },
        },
      },
    },
    "/perguntas": {
      get: {
        tags: ["Perguntas"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: "Listar todas as perguntas",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Listar_Perguntas" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Perguntas"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: "Cadastrar nova pergunta",
        description:
          "Recebe mensagem, modo_anonimo, data_envio, mensagem, data_resposta, resposta para cadastrar nova pergunta",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cadastrar_Pergunta",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Pergunta cadastrado com sucesso!",
          },
          500: {
            description: "Erro interno no servidor",
          },
        },
      },
    },
    "/perguntas/{id_pergunta}": {
      put: {
        tags: ["Perguntas"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: "Atualizar todos os dados das perguntas",
        description:
          "Atualiza todos os dados de uma pergunta existente, é necessário enviar todos os campos",
        parameters: [
          {
            name: "id_pergunta",
            in: "path",
            required: true,
            description: "ID da pergunta a ser atualizada",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizar_Pergunta" },
              example: {
                mensagem: "como somar 2 + 3?",
                modo_anonimo: false,
                data_envio: "08/06/2026",
                resposta: "",
                data_resposta: "09/06/2026",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário atualizado com sucesso!",
          },
          404: {
            description: "Usuário não encontrado",
            content: {
              "application/json": {
                example: { message: "Usuário não encontrado" },
              },
            },
          },
          500: {
            description: "Erro interno no servidor",
          },
        },
      },
      delete: {
        tags: ["Perguntas"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: "Remover pergunta",
        description: "Remove pergunta existente",
        parameters: [
          {
            name: "id_pergunta",
            in: "path",
            required: true,
            description: "ID da pergunta",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "Pergunta removida com sucesso!",
          },
          404: {
            description: "Pergunta não encontrada",
            content: {
              "application/json": {
                example: { message: "Pergunta não encontrada" },
              },
            },
          },
          500: {
            description: "Erro interno no servidor",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "insira o token JWT obtido no login",
      },
    },
    schemas: {
      // Usuários
      Listar_Usuarios: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "Ricardo" },
          email: { type: "string", example: "ricardo@email.com" },
          tipo: { type: "string", example: "Admin" },
          materia: { type: "string", example: "Matemática" },
        },
      },
      Cadastrar_Usuario: {
        type: "object",
        required: ["nome", "email", "senha"],
        properties: {
          nome: { type: "string", example: "Lyuz" },
          email: { type: "string", example: "lyuz@email.com" },
          senha: { type: "string", example: "Senha123" },
          tipo: { type: "string", example: "Aluno" },
        },
      },
      Atualizar_Usuario: {
        type: "object",
        required: ["nome", "email", "senha", "materia", "tipo"],
        properties: {
          nome: { type: "string", example: "Lyuz" },
          email: { type: "string", example: "Lyuz@email.com" },
          senha: { type: "string", example: "123" },
          materia: { type: "string", example: "" },
          tipo: { type: "string", example: "Aluno" },
        },
      },
      Login_Usuario: {
        type: "object",
        required: ["email", "senha"],
        properties: {
          email: { type: "string", example: "lyuz@email.com" },
          senha: { type: "string", example: "Senha123" },
        },
      },
      Resposta_Login: {
        type: "object",
        properties: {
          message: { type: "string", example: "Login realizado com sucesso" },
          token: {
            type: "string",
            description: "Token JWT gerado ",
            example: "jkdsjaiojeiwuhgrjnej",
          },
          usuario: {
            type: "object",
            properties: {
              id_usuario: { type: "string", example: 1 },
              nome: { type: "string", example: "Ricardo" },
            },
          },
        },
      },
      // Perguntas
      Listar_Perguntas: {
        properties: {
          id: { type: "integer", example: 1 },
          mensagem: { type: "string", example: "Como calculo 1 + 1?" },
          modo_anonimo: { type: "boolean", example: false },
          data_envio: { type: "string", example: "08/06/2026" },
          resposta: {
            type: "string",
            example: "O resultado dessa operação é 2",
          },
          data_resposta: { type: "string", example: "09/06/2026" },
        },
      },
      Cadastrar_Pergunta: {
        properties: {
          id: { type: "integer", example: 1 },
          mensagem: { type: "string", example: "Como calculo 1 + 1?" },
          modo_anonimo: { type: "boolean", example: false },
          data_envio: { type: "string", example: "08/06/2026" },
          resposta: {
            type: "string",
            example: "O resultado dessa operação é 2",
          },
          data_resposta: { type: "string", example: "09/06/2026" },
        },
      },
      Atualizar_Pergunta: {
        type: "object",
        required: [
          "mensagem",
          "modo_anonimo",
          "data_envio",
          "resposta",
          "data_resposta",
        ],
        properties: {
          id: { type: "integer", example: 1 },
          mensagem: { type: "string", example: "Como calculo 1 + 1?" },
          modo_anonimo: { type: "boolean", example: false },
          data_envio: { type: "string", example: "08/06/2026" },
          resposta: {
            type: "string",
            example: "O resultado dessa operação é 2",
          },
          data_resposta: { type: "string", example: "09/06/2026" },
        },
      },
    },
  },
};

export default documentacao;
