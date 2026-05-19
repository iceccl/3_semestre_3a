const documentacao = {
    openapi: '3.0.3',
    info:{
        title: 'API finanControl',
        description: 'Documentação da API do sistema finanControl',
        version: '1.0.0'
    },
    servers: [
        {url: 'http://localhost:3000', description: 'localhost'}
    ],
    tags: [
        {name: 'Usuários', description: 'Operações relacionadas aos usuários'},
        {name: 'Categorias', description: 'Operações relacionadas às categorias'},
        {name: 'SubCategorias', description: 'Operações relacionadas às sub categorias'},
        {name: 'Transações', description: 'Operações relacionadas às relaçõess'},
        {name: 'Autenticação', description: 'Operações de autenticação'}
    ],
    paths: {
        "/usuarios": {
            get: {
                tags:["Usuários"],
                summary: "Listar todos os usuários",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Usuarios'}
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags:['Usuários'],
                summary: 'Cadastrar novo usuário',
                description: "Recebe nome, email, senha para cadastrar novo usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/usuarios/{id_usuario}":{
            put: {
                tags: ['Usuários'],
                summary: 'Atualizar todos os dados do usuário',
                description: 'Atualiza todos os dados de um usuário existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content:{
                        "application/json":{
                            schema: {$ref: "#/components/schemas/Atualizar_Usuario"},
                            example: {
                                nome: "Ricardo Santos",
                                email:"ricardo5@sesisp.com",
                                senha: "senhaAtualizada"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Usuário atualizado com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json":{
                                example: {message: "Usuário não encontrado"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }

            },
            delete: {
                tags: ['Usuários'],
                summary: 'Remover Usuário',
                description: 'Remove usuário existente pelo ID',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Usuário removido com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json":{
                                example: {message: "Usuário não encontrado"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }
            },
            
        },
        "/login": {
                post: {
                tags:['Autenticação'],
                summary: 'Realizar Login',
                description: "Autentica um usuario e retorna id e nome",
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Login_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso!",
                        content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Resposta_Login"
                            }
                        }
                    }
                    },
                    400: {description: "Email e senha são obrigatorios"},
                    401: {description: "Credenciais inválidas"},
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/categorias": {
            get: {
                tags:["Categorias"],
                summary: "Listar todos as Categorias",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Categorias'}
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags:['Categorias'],
                summary: 'Cadastrar nova categoria',
                description: "Recebe nome, descrição, cor, icone e titulo para cadastrar nova categirua",
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Categoria"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Categoria cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/categorias/{id_categoria}": {
            put: {
                tags: ['Categorias'],
                summary: 'Atualizar todos os dados da Categoria',
                description: 'Atualiza todos os dados de uma categoria existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria a ser atualizada",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content:{
                        "application/json":{
                            schema: {$ref: "#/components/schemas/Atualizar_Categoria"},
                            example: {
                                nome: "alimentação",
                                descricao: "tipo alimentação",
                                cor: "#fff",
                                icone: "URLdoIcone",
                                tipo: "a"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Categoria atualizada com sucesso!"
                    },
                    404: {
                        description: "Categoria não encontrada",
                        content: {
                            "application/json":{
                                example: {message: "Categoria não encontrada"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }

            },
            delete: {
                tags: ['Categorias'],
                summary: 'Remover Categoria',
                description: 'Remove categoria existente pelo ID',
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria a ser removida",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Categoria removida com sucesso!"
                    },
                    404: {
                        description: "Categoria não encontrada"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/subCategorias": {
            get: {
                tags:["SubCategorias"],
                summary: "Listar todos as sub categorias",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_SubCategorias'}
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags:['SubCategorias'],
                summary: 'Cadastrar nova sub categoria',
                description: "Recebe nome, ativo e id_categoria para cadastrar nova categoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_SubCategoria"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Sub categoria cadastrads com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/subCategorias/{id_subcategoria}": {
            put: {
                tags: ['SubCategorias'],
                summary: 'Atualizar todos os dados da sub categoria',
                description: 'Atualiza todos os dados de uma sub categoria existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da sub categoria a ser atualizada",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content:{
                        "application/json":{
                            schema: {$ref: "#/components/schemas/Atualizar_SubCategoria"},
                            example: {
                                nome: "carne",
                                ativo: true,
                                id_categoria: 1
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Sub Categoria atualizada com sucesso!"
                    },
                    404: {
                        description: "Sub Categoria não encontrada",
                        content: {
                            "application/json":{
                                example: {message: "Sub Categoria não encontrada"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }
            },
        },
        "/transacoes": {
            get: {
                tags:["Transações"],
                summary: "Listar todos as Transações",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Transacoes'}
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags:['Transações'],
                summary: 'Cadastrar nova transação',
                description: "Recebe valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, nome_categoria e nome_subcategoria para cadastrar nova transação",
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Transacao"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Transacao cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/transacoes/tipo/{tipo}": {
            get: {
                tags:["Transações"],
                summary: "Listar Transações pelo tipo (entrada ou saída)",
                parameters: [
                    {
                        name: "tipo",
                        in: "path",
                        required: true,
                        description: "tipo Transação (E = entrada / S = saída)",
                        schema: {type: "string", enum: ["E", "S"], example: "S"}
                    }
                ],
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Transacoes'}
                                }
                            }
                        }
                    }
                }
            }
        },
        "/transacoes/categoria/{id_categoria}": {
            get: {
                tags:["Transações"],
                summary: "Listar Transações pela categoria",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Transacoes'}
                                }
                            }
                        }
                    }
                }
            }
        },
        "/transacoes/subcategoria/{id_subcategoria}": {
            get: {
                tags:["Transações"],
                summary: "Listar Transações pela sub categoria",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Transacoes'}
                                }
                            }
                        }
                    }
                }
            }
        },
        "/transacoes/{id_transacao}": {
            put: {
                tags: ['Transações'],
                summary: 'Atualizar todos os dados da Transacao',
                description: 'Atualiza todos os dados de uma transacao existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_transacao",
                        in: "path",
                        required: true,
                        description: "ID da Transacao a ser atualizada",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content:{
                        "application/json":{
                            schema: {$ref: "#/components/schemas/Atualizar_Transacao"},
                            example: {
                                valor: 150,
                                descricao: "Consulta médica",
                                data_registro: "06/04/2026",
                                data_vencimento: "17/04/2026",
                                data_pagamento: "25/04/2026",
                                tipo: "E",
                                id_categoria: 1,
                                id_subcategoria: 1
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Transacao atualizada com sucesso!"
                    },
                    404: {
                        description: "Transacao não encontrada",
                        content: {
                            "application/json":{
                                example: {message: "Transacao não encontrada"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }
            },
        },
        "/transacoes/agendar": {
            post: {
                tags: ["Transações"],
                summary: "Agendar compromisso único",
                description: "Esta rota verifica se o usuário possui um registro para a mesma data",
                security: [{bearerAuth: []}],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Transacao"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Agendamento realizado com sucesso!"
                    }
                }
            }
        },
        "/dashboard": {
            get: {
                tags: ["Dashboard"],
                summary: "Obtém todos os dados consolidados do dashboard",
                description: "Retorna o resumo do mês, atual, gastos por categoria, maiores despesas",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "Application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        resumoMesAtual: {
                                            type: "Object",
                                            properties: {
                                                entradas: {type: "number", "example": 500},
                                                saidas: {type: "number", "example": 250},
                                                saldo: {type: "number", "example": 241}
                                            }
                                        },
                                        resumoCategorias: {
                                            type: "Object",
                                            properties: {
                                                nome: {type: "string", example: "Alimentacao"},
                                                total: {type: "number", example: 256},
                                            }
                                        },
                                        resumoMaioresGastos: {
                                            type: "Object",
                                            properties: {
                                                descricao: {type: "string", example: "Aluguel"},
                                                valor: {type: "number", example: 1500.00},
                                                data: {type: "string", example: "10/05/2026"}
                                            }
                                        },
                                        resumoUltimasTransacoes: {
                                            type: "Object",
                                            properties: {
                                                descricao: {type: "string", example: "Aluguel"},
                                                valor: {type: "number", example: 1500.00},
                                                data: {type: "string", example: "10/05/2026"}
                                            }
                                        },
                                        resumoEvolucao: {
                                            type: "Object",
                                            properties: {
                                                mes: {type: "string", example: "05/2026"},
                                                entradas: {type: "number", example: 1500.00},
                                                saidas: {type: "number", example: 2000}
                                            }
                                        },
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor."
                    }
                }
            }
        }
    },
    components:{
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'insira o token JWT obtido no login'
            }
        },
        schemas:{
            // Usuários
            Listar_Usuarios:{
                type: 'object',
                properties: {
                    id: {type: "integer", example: 1},
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo@email.com"},
                    tipo_acesso: {type: "string", example: "Admin"}
                }
            },
            Cadastrar_Usuario: {
                type: 'object',
                required: ["nome", "email", "senha"],
                properties: {
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo2@email.com"},
                    senha: {type: "string", example: "Senha123"},
                    tipo_acesso: {type: "string", example: "Admin"}
                }
            },
            Atualizar_Usuario: {
                type: 'object',
                required: ["nome", "email", "senha"],
                properties: {
                    nome: {type: "string", example: "Nina"},
                    email: {type: "string", example: "nina@email.com"},
                    senha: {type: "string", example: "Senha123"},
                    tipo_acesso: {type: "string", example: "Admin"}
                }
            },
            Login_Usuario : {
                type: 'object',
                required: ["email", "senha"],
                properties: {
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo2@email.com"},
                    senha: {type: "string", example: "Senha123"}
                }
            },
            Resposta_Login : {
                type: 'object',
                properties:{
                message: {type: 'string', example: 'Login realizado com sucesso'},
                token:{
                    type: 'string',
                    description: 'Token JWT gerado ',
                    example: 'jkdsjaiojeiwuhgrjnej',
                },
                usuario: {
                    type: 'object',
                    properties: {
                    id_usuario: {type: "string", example: 1},    
                    nome: {type: "string", example: "Ricardo"},
                }
                }    
                }
            },

            // Categorias
            Listar_Categorias: {
                type: 'object',
                properties: {
                    id_categoria: {type: "integer", example: 1},
                    nome: {type: "string", example: "Alimentação"},
                    descricao: {type: 'text', example: "tipo alimentação"},
                    cor: {type: "string", example: "#fff"},
                    icone: {type: "string", example: 'URLdoIcone'},
                    tipo: {type: "string", example: "E"}
                }
            },
            Cadastrar_Categoria: {
                type: 'object',
                required: ["nome", "descricao", "cor", "icone", "tipo"],
                properties: {
                    nome: {type: "string", example: "Alimentação"},
                    descricao: {type: 'text', example: "tipo alimentação"},
                    cor: {type: "string", example: "#fff"},
                    icone: {type: "string", example: 'URLdoIcone'},
                    tipo: {type: "string", example: "E"}
                }
            },
            Atualizar_Categoria: {
                type: 'object',
                required: ["nome", "descricao", "cor", "icone", "tipo"],
                properties: {
                    nome: {type: "string", example: "Nina"},
                    descricao: {type: 'text', example: "tipo alimentação"},
                    cor: {type: "string", example: "#fff"},
                    icone: {type: "string", example: 'URLdoIcone'},
                    tipo: {type: "string", example: "E"}
                }
            },

            // Sub Categorias
            Listar_SubCategorias: {
                type: 'object',
                properties: {
                    id_subcategoria: {type: "integer", example: 1},
                    nome: {type: "string", example: "carne"},
                    ativo: {type: 'boolean', example: true},
                    id_categoria: {type: "integer", example: 1}
                }
            },
            Cadastrar_SubCategoria: {
                type: 'object',
                required: ["nome", "ativo"],
                properties: {
                    nome: {type: "string", example: "carne"},
                    ativo: {type: 'boolean', example: true},
                    id_categoria: {type: "integer", example: 1}
                }
            },
            Atualizar_SubCategoria: {
                type: 'object',
                required: [ "nome", "ativo", "id_categoria" ],
                properties: {
                    nome: {type: "string", example: "carne"},
                    ativo: {type: 'boolean', example: true},
                    id_categoria: {type: "integer", example: 1}
                }
            },

            // Transações
            Listar_Transacoes: {
                type: 'object',
                properties: {
                    id_transacao: {type: "integer", example: 1},
                    valor: {type: 'number', example: 150.00},
                    descricao: {type: 'string', example: "Consulta médica"},
                    data_registro: {type: "string", example: "06/04/2026"},
                    data_vencimento: {type: "string", example: "17/04/2026"},
                    data_pagamento: {type: "string", example: "25/04/2026"},
                    tipo: {type: "string", enum:["E", "S"], example: "E"},
                    nome_categoria: {type: "string", example: "Saúde"},
                    nome_subcategoria: {type: "string", example: "Consulta médica"}
                }
            },
            Cadastrar_Transacao: {
                type: 'object',
                required: ["valor", "descricao", "data_registro", "data_vencimento", "data_pagamento", "tipo"],
                properties: {
                    valor: {type: 'number', example: 150.00},
                    descricao: {type: 'string', example: "Consulta médica"},
                    data_registro: {type: "string", example: "06/04/2026"},
                    data_vencimento: {type: "string", example: "17/04/2026"},
                    data_pagamento: {type: "string", example: "25/04/2026"},
                    tipo: {type: "string", enum:["E", "S"], example: "E"},
                    id_categoria: {type: "integer", example: 1},
                    id_subcategoria: {type: "integer", example: 1}
                }
            },
            Atualizar_Transacao: {
                type: 'object',
                required: [ "valor", "descricao", "data_registro", "data_vencimento", "data_pagamento", "tipo", "id_categoria", "id_subcategoria"],
                properties: {
                    valor: {type: 'number', example: 150.00},
                    descricao: {type: 'string', example: "Consulta médica"},
                    data_registro: {type: "string", example: "06/04/2026"},
                    data_vencimento: {type: "string", example: "17/04/2026"},
                    data_pagamento: {type: "string", example: "25/04/2026"},
                    tipo: {type: "string", enum:["E", "S"], example: "E"},
                    id_categoria: {type: "integer", example: 1},
                    id_subcategoria: {type: "integer", example: 1}
                }
            }
        }
    }
}
export default documentacao