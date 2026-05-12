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
                security: [
                    {
                        bearerAuth: []
                    }
                ],
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
                                senha: "senhaAtualizada",
                                tipo: 'Cliente'
                            }
                        }
                    }
                },
                responses: {
                    201: {
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
        "/servicos/{id_servico}": {
            put: {
                tags: ['Serviços'],
                summary: 'Atualizar todos os dados do Serviço',
                description: 'Atualiza todos os dados de um Serviço existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do Serviço a ser atualizado",
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
                            schema: {$ref: "#/components/schemas/Atualizar_Servico"},
                            example: {
                                nome: "Corte de cabelo",
                                preco: 65.4,
                                descricao: "corte padrão",
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Serviço atualizado com sucesso!"
                    },
                    404: {
                        description: "Serviço não encontrado",
                        content: {
                            "application/json":{
                                example: {message: "Serviço não encontrado"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }

            },
            delete: {
                tags: ['Serviços'],
                summary: 'Remover Serviço',
                description: 'Remove serviço existente pelo ID',
                parameters: [
                    {
                        name: "id_servico",
                        in: "path",
                        required: true,
                        description: "ID do serviço a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Serviço removido com sucesso!"
                    },
                    404: {
                        description: "Serviço não encontrado",
                        content: {
                            "application/json":{
                                example: {message: "Serviço não encontrado"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }
            },
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
            },
            post: {
                tags: ["Agendamentos"],
                summary: "cadastrando novos agendamentos",
                description: "Recebe os elementos nescessários para cadastrar um novo agendamento",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Cadastrar_Agendamento"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Agendamento cadastrado com sucesso"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/agendamentos/{id_agendamento}": {
            put: {
                tags: ['Agendamentos'],
                summary: 'Atualizar todos os dados do agendamento',
                description: 'Atualiza todos os dados de um agendamento existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_agendamento",
                        in: "path",
                        required: true,
                        description: "ID do agendamento a ser atualizado",
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
                            schema: {$ref: "#/components/schemas/Atualizar_Agendamento"},
                            example: {
                                data_hora: '05/05/2026',
                                status: 'Ativa',
                                id_usuario: '1',
                                id_servico: '1'
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Agendamento atualizado com sucesso!"
                    },
                    404: {
                        description: "Agendamento não encontrado",
                        content: {
                            "application/json":{
                                example: {message: "Agendamento não encontrado"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }

            },
            delete: {
                tags: ['Agendamentos'],
                summary: 'Remover Agendamento',
                description: 'Remove agendamento existente pelo ID',
                parameters: [
                    {
                        name: "id_agendamento",
                        in: "path",
                        required: true,
                        description: "ID do agendamento a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Agendamento removido com sucesso!"
                    },
                    404: {
                        description: "Agendamento não encontrado",
                        content: {
                            "application/json":{
                                example: {message: "Agendamento não encontrado"}
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                    
                }
            },
        }
    },
    components: {
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'insira o token JWT obtido no login'
            }
        },
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
            Atualizar_Usuario: {
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
            Atualizar_Servico: {
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
            },
            Cadastrar_Agendamento: {
                type: 'object',
                properties: {
                    data_hora: {type: "string", example: '05/05/2026'},
                    status: {type: "string", example: 'Ativa'},
                    id_usuario: {type: "integer", example: '1'},
                    id_servico: {type: "integer", example: '1'}
                }
            },
            Atualizar_Agendamento: {
                type: 'object',
                properties: {
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