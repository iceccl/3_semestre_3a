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
        {name: 'Categorias', description: 'Operações relacionadas as categorias'},
        {name: 'SubCategorias', description: 'Operações relacionadas as sub categorias'}
    ],
    paths: {
        "/usuarios": {
            get: {
                tags:["Usuários"],
                summary: "Listar todos os usuários",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "apllication/json":{
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
                            "apllication/json":{
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
                    201: {
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
        },
        "/subCategorias": {
            get: {
                tags:["SubCategorias"],
                summary: "Listar todos as sub categorias",
                responses: {
                    200:{
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "apllication/json":{
                                schema:{
                                    type: "array",
                                    items: {$ref: '#/components/schemas/Listar_SubCategorias'}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components:{
        schemas:{
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
                required: true,
                properties: {
                    nome: {type: "string", example: "Ricardo"},
                    email: {type: "string", example: "ricardo2@email.com"},
                    senha: {type: "string", example: "Senha123"}
                }
            },
            Reposta_Login : {
                type: 'object',
                properties:{
                message: {type: 'string', example: 'Login realizado com sucesso'},
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
            Listar_Categorias:{
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
            Listar_SubCategorias:{
                type: 'object',
                properties: {
                    id_subcategoria: {type: "integer", example: 1},
                    nome: {type: "string", example: "carne"},
                    ativo: {type: 'boolean', example: true},
                    id_categoria: {type: "integer", example: 1}
                }
            },
        }
    }
}
export default documentacao