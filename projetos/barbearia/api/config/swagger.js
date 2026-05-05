const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API barbearia',
        description: 'Documentação da API da barbearia',
        version: '1.0.0'
    },
    servers: [
        {url: 'http://localhost:3000', description: 'localhost'}
    ],
    tags: [
        {name: 'Usuários', description: 'Operações relacionadas à tabela de usuários'},
        {name: 'Serviços', description: 'Operações relacionadas à tabela de serviços'},
        {name: 'Agendamentos', description: 'Operações relacionadas à tabela de agendamentos'},
    ],
    paths: {
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar todos os usuários",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Usuarios'}
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Usuários'],
                summary: 'Cadastrar novos usuários',
                description: "Recebe os elementos nescessários para cadastrar um novo usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário cadastrado com sucesso"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        // servicos
        "/servicos": {
            get: {
                tags: ["Serviços"],
                summary: "listar todos os serviços",
                responses: {
                    200: {
                        description: 'Dados obtidos com sucesso',
                        content: {
                            "application/json": {
                                schema: {
                                    type: 'array',
                                    items: {$ref: '#/components/schema/Listar_Servicos'}
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Serviços'],
                summary: 'Cadastrar novos serviços',
                description: "Recebe os elementos nescessários para cadastrar um novo serviço",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Servico"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Serviço cadastrado com sucesso'
                    },
                    500: {
                        description: 'Erro interno no servidor'
                    }
                }
            }   
        },
        // agendamentos
        "/agendamentos": {
            get: {
                tags: ["Agendamentos"],
                summary: 'Listar todos os agendamentos',
                responses: {
                    200: {
                        description: 'Dados obtidos com sucesso',
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_Agendamentos'}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            // Usuários
            Listar_Usuarios: {
                type: 'object',
                properties: {
                    id: {type: "integer", example: 1},
                    nome: {type: "string", example: "Lyuz"},
                    email: {type: "string", example: "lyuz.blablabla@gmail.com"},
                    tipo: {type: "string", example: "Cliente"}
                }
            },
            Cadastrar_Usuario: {
                type: 'object',
                properties: {
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo2@email.com"},
                    senha: {type: "string", example: "Senha123"},
                    tipo: {type: "string", example: "barbeiro"}
                }
            },
            // Serviços
            Listar_Servicos: {
                id: {type: "integer", example: 1},
                nome: {type: "string", example: "Corte de cabelo"},
                preco: {type: "float", example: "59.90"},
                descricao: {type: 'string', example: "corte masculino classico"}
            },
            Cadastrar_Servico: {
                type: 'object',
                properties: {
                    id: {type: "integer", example: 1},
                    nome: {type: "string", example: "Corte de cabelo"},
                    preco: {type: "float", example: "59.90"},
                    descricao: {type: 'string', example: "corte masculino classico"}
                }
            },
            // Agendamentos
            Listar_Agendamentos: {
                type: 'object',
                properties: {
                    id_agendamrento: {type: "integer", example: 1},
                    data_hora: {type: "string", example: '05/05/2026'},
                    status: {type: "string", example: 'Ativa'},
                    id_usuario: {type: "integer", example: '1'},
                    id_servico: {type: "integer", example: '1'}
                }
            }
        }
    }
}

export default documentacao