Método	  Endpoint	                Descrição	                                                                        Requisito Relacionado
POST	    /login	                  Realiza a validação de ID e garante senha para acesso para o resto do sistema	    RF01
GET	      /usuarios	                Retorna todos os usuários	                                                        RF02
POST	    /usuarios	                Cadastra um novo usuário	                                                        RF03
PUT	      /usuários/{id_usuario}	  Atualiza um usuário com base em seu ID	                                          RF04
DELETE	  /usuários/{id_usuario}	  Deleta um usuário com base no seu ID	                                            RF06
GET	      /perguntas	              Retorna todas as perguntas da tabela de mesmo nome	                              RF07
POST	    /perguntas	              Envia uma nova pergunta	                                                          RF08
PUT	      /perguntas/{id_pergunta}  Atualiza uma nova pergunta com base em seu ID	                                    RF09
DELETE	  /perguntas/{id_pergunta}	Deleta uma pergunta com base em seu ID	                                          RF10
