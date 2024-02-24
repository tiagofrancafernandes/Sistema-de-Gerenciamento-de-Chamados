

## Clientes
* Cadastro
* Listagem
* Edição

**Campos:**
- nome
- Área de atuação (setor)

-----

## Categorias (do chamado)
* Cadastro
* Listagem
* Edição

### Chamados
* Cadastro
* Listagem
* Edição

**Campos:**
- [ver campos no PDF]
- cliente
- tipo de pedido (categoria)
- [campos específicos do tipos como anexos etc]
- [TODO]
- data e hora da criação (interno)
- usuário solicitante
- status (interno)
- *Comentários*[]
    - anexos
    - mensagem

## Usuários
* Cadastro
* Listagem
* Edição

**Campos:**
- Nome
- E-mail
- Senha
- Papéis
- Permissões
- É agente? (se for um agente do sistema)
- ClienteID (se for usuário de cliente)
- É usuário admin da empresa? (se for usuário de cliente)


-----

#### REGRAS

* Um usuário da empresa PODE ver TODOS os pedidos da empresa.
* Um usuário **só pode** ADICIONAR COMENTÁRIO nos próprios chamados ou se for um ADMIN do cliente
