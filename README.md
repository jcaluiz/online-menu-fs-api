# Boas-vindas ao repositório do Teste para Desenvolvedor(a) Node da Fábrica de Startup

  Para executar tudo de forma correta, atente-se a cada passo descrito a seguir, e se tiver alguma dúvida, envie um email para lacjunior129.la@gmail.com.

  Aqui você vai encontrar detalhes de como executar o projeto a partir deste repositório e também como está estruturada sua Arquitetura de Software.

<br>

# Introdução

<details>
  <summary><strong> 👨‍💻 O que foi desenvolvido?</strong></summary>

  Este projeto foi desenvolvido utilizando os princípios de Programação Orientada a Objetos(`POO`) para a construção de uma API com `CRUD` para gerenciar o menu de um restaurante. A API foi feita em Node.js utilizando TypeScript, uma linguagem de programação de um superconjunto sintático estrito de JavaScript e tipagem estática opcional a linguagem, e o banco de dados `MongoDB` através do framework do `Mongoose`.

  <br>
</details>

<br>

# Orientações

<details>
  <summary><strong>🐳 Rodando no Docker vs Localmente</strong></summary>

  ## 👉 Com Docker

  **⚠ Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d`.

  - Lembre-se de parar o `mongo` se estiver usando localmente na porta padrão (`27017`), ou adapte, caso queira fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `online_menu` e outro chamado `online_menu_db`.
  - A partir daqui você pode rodar o container `online_menu` via CLI ou abri-lo no VS Code.
  
  > :information_source: Use o comando `docker exec -it online_menu bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
  
  > :information_source: Instale as dependências com `npm install` 

  - **⚠ Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima.
  
  <br />

  ## 👉 Sem Docker

  > :information_source: Instale as dependências com `npm install`

  - ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  
  ### Informação muito importante se não for usar o Docker

  - Para utilizar as variáveis de ambiente, renomeie o arquivo `.env.example` para `.env`
  
  <br>
</details>

<details>
  <summary><strong>Antes de começar!!</strong></summary>

  1. Clone o repositório
  
  - Use o comando: `git clone https://github.com/jcaluiz/online-menu-fs-api.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd online-menu-fs-api`

  2. Instale as dependências

  - `npm install`
  
  <br>
</details>

<details>
  <summary><strong>🛠 Execução de testes localmente</strong></summary>

  Em breve será desenvolvido os testes
  <br>
</details>

<details>
  <summary><strong>⚠️ Informações Sobre a Estrutura do projeto </strong></summary>

  ## Arquitetura do projeto

  A arquitetura de software do projeto é a MSC (Model-Service-Controller), que é uma variação da MVC. O padrão da MSC separa em três componentes principais: model, service e controller.

  O `Model` é responsável por acomodar todo código capaz de acessar dados para o banco de dados MongoDB utilizando o framework mongoose. As outras camadas não precisam saber qual é o banco de dados que está sendo armazenado ou recuperado.

  O `Service` é responsável por validar as regras de negócio para o acesso do administrador, para acessar as categorias e para estruturar os dados de `CRUD` de produtos.

  O `Controller` é responsável por validar os valores recebidos do cliente da aplicação. Ele pode receber um `JSON` dentro do corpo da requisição `HTTP`, parâmetros de requisição, dentre outros.

  ```tree
  .
  ├── src/
  │   ├──api/
  │   │  ├── Controllers/
  │   │  ├── data/
  │   │  ├── Domains/
  │   │  ├── Interfaces/
  │   │  ├── Middlewares/
  │   │  ├── Models/
  │   │  ├── Routes/
  │   │  ├── Services/
  │   │  ├── shared/
  │   │  ├── Utils/
  │   │  └── ...
  │   ├── tests/
  │   │   ├── unit/
  │   |   │      ├── Services/
  │   |   │      ├── ...
  │   |   └── ... 
  │   └── ...
  ```

  ### Informações dos papéis de cada pasta

  - A pasta `data` está armazenando um `JSON` que contém uma lista de categorias que dá a possibilidade de adicionar diretamente as categorias no banco de dados. Estes dados em `JSON` são utilizados na inicialização do servidor `Express`.
  - A pasta `Domains` é responsável por formatar os dados para uma forma mais legível no retorno dos métodos das classes que necessitam de apresentar esses dados numa requisição `HTTP`.
  - A pasta `Interfaces` contém as interfaces de IUser, que padroniza a forma de armazenamento e desenvolvimento do usuário administrador, de IProduct, que padroniza a forma de armazenamento e desenvolvimento de produtos, e de ICategory, ue padroniza a forma de armazenamento e desenvolvimento de categorias.
  - A pasta `Middlewares` contém os middlewares de tratamento de erro no arquivo `ErrorHandler`, de criação e verificação de token utilizando o `Json Web Token` no arquivo `Token` e o de autorização, responsável por verificar se contém um token no headers.Authorization e se é um token válido, no arquivo `Authorization`.
  - A pasta `Routes` que contém os métodos de rotas como `GET`, `POST`, `PATCH` e `DELETE`. Dentro dessa pasta há arquivos correspondente a cada tipo de coleção e possui e além de possuir os controllers nos seus métodos, também possui os middlewares de autorização e de tratamento de erro.
  - A pasta `shared` contém um arquivo que possui um objeto com os `status code` para ser usado na resposta das requisições.
  - A pasta `Util` contém um arquivo para estruturar os erros que é recebido das exceções das arquiteturas e fazer o tratamento em `ErrorHandler.handle`.
  - Além de tudo isso, contém dentro da pasta `api` os arquivos `app` e `server`. O `app` é responsável pelas configurações do servidor e o server inicia o servidor com o `npm run dev`.
  
</details>

<details>
<summary><strong>Utilize a extensão do VSCode como o Thunder Client</strong></summary>

  ## Thunder Client
  > O Thunder Client é uma extensão do Visual Studio Code que funciona como nosso client REST habitual onde podemos fazer requests GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS e também requests de GraphQL, ele foi desenvolvido por Ranga Vadhineni usando JavaScript, Flexbox, Typescript, Ace Editor, Got, Nedb, tudo isso sem frameworks JS e Bootstrap.

  Fonte: [Artigo sobre o Thunder Client](https://lucascmendes.medium.com/thunder-client-o-novo-client-rest-do-momento-3d8537821a23)

</details>

<br>

Depois de ter feito todas as configurações do projeto, vamos a API

<br>

# Executando o Projeto

## Inicie o servidor com "npm run dev" na raiz do projeto

  <details>
 
  <summary><strong>01 - POST /auth/login - Acesso de administrador do restaurante para acessar o sistema</strong></summary>

  * Existe um usuário administrador. Para ter acesso e receber o token, deve ter no `body` da requisição o seguinte usuário:
  
  ~~~json
  {
    "email": "adm@email.com",
    "password": "@Luiz2912"
  }
  ~~~

  * A rota localmente fica dessa forma: `http://localhost:3001/auth/login`. Caso tenha mudado a porta, é só trocar o 3001 pela porta trocada.

  * Deve retornar um token parecido com esse:

  ~~~json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbUBlbWFpbC5jb20iLCJpYXQiOjE2ODEwNjEwMTMsImV4cCI6MTY4MTE0NzQxM30.ttl7564Tim695GFOZ2K7yxtvVcxHin6jv0XO0B_j20I"
  }
  ~~~

  * O token que receber deve ser utilizado para tudo a partir de agora até que expire o tempo de 1 dia, o tempo de validade do token.

  * Caso digite email ou senha inválidos, receberá a seguinte mensagem:

  ~~~json
  {
    "message": "Usuário não encontrado"
  }
  ~~~

  </details>

  <br>

  <details>
  <summary><strong>02 - GET /category - lista todas as categorias de produtos</strong></summary>

  <br>

  ### Rota para a requisição

  * Ao utilizar o GET /category, caso a porta seja 3001, a rota fica a seguinte: `http://localhost:3001/category/`

  ### Autenticação com token

  * Caso não passe o token que recebeu de POST /auth/login, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Token not found"
    }
    ~~~

  * E caso passe um token inválido, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Invalid Token"
    }
    ~~~

  ### Dado de Category

  * A estrutura de Category é a seguinte:
  
      ~~~typescript
      {
        id: string,
        parent: Category | null,
        name: string,
      }
      ~~~

  ### Fazendo a requisição

  <details>
  <summary>Ao executar o GET /category, deve retornar as seguintes categorias:</summary>

  <br>

   ~~~json
  [
    {
      "id": "6432ef6413905a7d1dc4702e",
      "parent": null,
      "name": "Bebidas"
    },
    {
      "id": "6432ef6413905a7d1dc4702f",
      "parent": null,
      "name": "Almoço"
    },
    {
      "id": "6432ef6413905a7d1dc47030",
      "parent": null,
      "name": "Sobremesas"
    },
    {
      "id": "6432ef6413905a7d1dc47031",
      "parent": {
        "parent": null,
        "name": "Bebidas"
      },
      "name": "Refrigerantes"
    },
    {
      "id": "6432ef6413905a7d1dc47032",
      "parent": {
        "parent": null,
        "name": "Bebidas"
      },
      "name": "Sucos Naturais"
    },
    {
      "id": "6432ef6413905a7d1dc47033",
      "parent": {
        "parent": null,
        "name": "Bebidas"
      },
      "name": "Água Mineral"
    },
    {
      "id": "6432ef6413905a7d1dc47034",
      "parent": {
        "parent": null,
        "name": "Bebidas"
      },
      "name": "Chás"
    },
    {
      "id": "6432ef6413905a7d1dc47035",
      "parent": {
        "parent": null,
        "name": "Bebidas"
      },
      "name": "Cafés"
    },
    {
      "id": "6432ef6413905a7d1dc47036",
      "parent": {
        "parent": null,
        "name": "Almoço"
      },
      "name": "Pratos Principais"
    },
    {
      "id": "6432ef6413905a7d1dc47037",
      "parent": {
        "parent": {
          "parent": null,
          "name": "Almoço"
        },
        "name": "Pratos Principais"
      },
      "name": "Carne"
    },
    {
      "id": "6432ef6413905a7d1dc47038",
      "parent": {
        "parent": {
          "parent": null,
          "name": "Almoço"
        },
        "name": "Pratos Principais"
      },
      "name": "Frango"
    },
    {
      "id": "6432ef6413905a7d1dc47039",
      "parent": {
        "parent": {
          "parent": null,
          "name": "Almoço"
        },
        "name": "Pratos Principais"
      },
      "name": "Peixe"
    },
    {
      "id": "6432ef6413905a7d1dc4703a",
      "parent": {
        "parent": null,
        "name": "Almoço"
      },
      "name": "Saladas"
    },
    {
      "id": "6432ef6413905a7d1dc4703b",
      "parent": {
        "parent": null,
        "name": "Almoço"
      },
      "name": "Sopas"
    },
    {
      "id": "6432ef6413905a7d1dc4703c",
      "parent": {
        "parent": null,
        "name": "Almoço"
      },
      "name": "Acompanhamentos"
    },
    {
      "id": "6432ef6413905a7d1dc4703d",
      "parent": {
        "parent": null,
        "name": "Sobremesas"
      },
      "name": "Bolos"
    },
    {
      "id": "6432ef6413905a7d1dc4703e",
      "parent": {
        "parent": null,
        "name": "Sobremesas"
      },
      "name": "Sorvetes"
    },
    {
      "id": "6432ef6413905a7d1dc4703f",
      "parent": {
        "parent": null,
        "name": "Sobremesas"
      },
      "name": "Pudins"
    }
  ]
  ~~~

  </details>
  </details>

  <br>

  <details>
  <summary><strong>03 - GET /product - lista todos os produtos</strong></summary>

  <br>

  ### Rota para a requisição
  * Ao utilizar o `GET /product`, caso a porta seja 3001, a rota fica a seguinte: `http://localhost:3001/product/`

  ### Autenticação com token

  * Caso não passe o token que recebeu de POST /auth/login, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Token not found"
    }
    ~~~

  * E caso passe um token inválido, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Invalid Token"
    }
    ~~~

  ### Dado de Product

  * A estrutura de Product é a seguinte:
  
    ~~~typescript
    {
        id: string,
        categories: Category.ObjectId[],
        name: string,
        qty: number,
        price: number,
      }
    ~~~

  Em `categories`, são armazenadas os ObjectId nas categorias dos produtos.

  ### Fazendo a requisição

  * Caso a coleção de produtos esteja vazia, retornará a seguinte mensagem:

    ~~~json
    {
      "message": "The Product Collection is empty"
    }
    ~~~

  * Caso queira ver como retorna todos os produtos quando a coleção não está vazia, localmente no seu computador, vá até o passo 5 e depois retorne.

  * Com a coleção populada, retornará da seguinte forma:

    ~~~json
    [
      {
        "id": "6433738145742a7c2ca2c14b",
        "categories": [
          "6433713845742a7c2ca2c138"
        ],
        "name": "Coca Cola 2 litros",
        "qty": 10,
        "price": 8
      },
      {
        "id": "6433771d45742a7c2ca2c150",
        "categories": [
          "6433713845742a7c2ca2c139"
        ],
        "name": "Suco de Maracujá 500 ml",
        "qty": 20,
        "price": 5
      },
      {
        "id": "643378b545742a7c2ca2c153",
        "categories": [
          "6433713845742a7c2ca2c13d"
        ],
        "name": "Risoto de Camarão",
        "qty": 20,
        "price": 15
      }
    ]
    ~~~

  </details>

  <br>

  <details>
  <summary><strong>04 - GET /product/:id - para pegar um produto</strong></summary>
  <br>

  ### Rota para a requisição
  * Ao utilizar o `GET /product/:id`, caso a porta seja 3001, a rota fica a seguinte: `http://localhost:3001/product/643378b545742a7c2ca2c153`

  ### Autenticação com token

  * Caso não passe o token que recebeu de POST /auth/login, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Token not found"
    }
    ~~~

  * E caso passe um token inválido, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Invalid Token"
    }
    ~~~

  ### Fazendo a requisição

  * Caso passe um Id que não existe, receberá a seguinte mensagem:

  ~~~json
  {
    "message": "Invalid Id"
  }
  ~~~

  * Caso passe um Id que existe no banco de dados e na coleção de `product`, terá o `status code 200 OK` e receberá o seguinte retorno:

  ~~~json
  {
    "id": "643378b545742a7c2ca2c153",
    "categories": [
      "6433713845742a7c2ca2c13d"
    ],
    "name": "Risoto de Camarão",
    "qty": 20,
    "price": 15
  }
  ~~~

  </details>

  <br>

  <details>
  <summary><strong>05 - POST /product - para criar um produto novo</strong></summary>
  <br>

  ### Rota para a requisição
  * Ao utilizar o `POST /product/`, caso a porta seja 3001, a rota fica a seguinte: `http://localhost:3001/product`

  ### Autenticação com token

  * Caso não passe o token que recebeu de POST /auth/login, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Token not found"
    }
    ~~~

  * E caso passe um token inválido, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Invalid Token"
    }
    ~~~

  ### Fazendo a requisição

  * Caso falte alguma propriedade no `body`, o `status code será 500` e a mensagem recebida será:

  ~~~json
  {
    "message": "Product validation failed: qty: Path `qty` is required."
  }
  ~~~

  #### Informações importantes para a requisição

  - Esta deve ser a estrutura do `body`:

  ~~~json
  {
    "categories": [
      {
        "name": "Pratos Principais"
      }
    ],
    "name": "Risoto de Camarão",
    "qty": 20,
    "price": 5
  }
  ~~~

  * Observe que dentro de `categories` deve receber um objeto que contenha uma chave `name`. O retorno será assim:

  ~~~json
  {
    "id": "64337f9945742a7c2ca2c162",
    "categories": [
      {
        "name": "Pratos Principais",
        "parent": {
          "parent": null,
          "name": "Almoço"
        },
        "id": "6433713845742a7c2ca2c13d"
      }
    ],
    "name": "Risoto de Camarão",
    "qty": 20,
    "price": 5
  }
  ~~~

  Porém, no banco de dados, em categories, recebe um id do tipo ObjectId. Assim que fica armazenado no banco de dados:

  ~~~json
  {
    "id": "64337f9945742a7c2ca2c162",
    "categories": [
      "6433713845742a7c2ca2c13d"
    ],
    "name": "Risoto de Camarão",
    "qty": 20,
    "price": 5
  }
  ~~~

  Percebe que é o mesmo id de cima.

  

  </details>

  <br>

  <details>
  <summary><strong>06 - PATCH /product/:id - para alterar um produtos</strong></summary>
  <br>

  ### Rota para a requisição
  * Ao utilizar o `PATCH /product/:id`, caso a porta seja 3001, a rota fica a seguinte: `http://localhost:3001/product/64337f9945742a7c2ca2c162`

  ### Autenticação com token

  * Caso não passe o token que recebeu de POST /auth/login, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Token not found"
    }
    ~~~

  * E caso passe um token inválido, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Invalid Token"
    }
    ~~~

  ### Fazendo a requisição

  * Vamos alterar um produto existente. Vamos alterar esse:

  ~~~json
  {
    "id": "64337f9945742a7c2ca2c162",
    "categories": [
      "6433713845742a7c2ca2c13d"
    ],
    "name": "Risoto de Camarão",
    "qty": 20,
    "price": 5
  }
  ~~~

  Vamos trocar o Risoto de Camarão por Risoto de Frango e vamos ver o retorno:

  ~~~json
  {
    "id": "64337f9945742a7c2ca2c162",
    "categories": [
      "6433880fcc2ac8d441198d81"
    ],
    "name": "Risoto de Frango",
    "qty": 20,
    "price": 5
  }
  ~~~

  </details>

  <br>

  <details>
  <summary><strong>07 - DELETE /product:id - para excluir um produto</strong></summary>
  <br>
  ### Rota para a requisição
  * Ao utilizar o `DELETE /product:id`, caso a porta seja 3001, a rota fica a seguinte: `http://localhost:3001/product/64337f9945742a7c2ca2c162`

  ### Autenticação com token

  * Caso não passe o token que recebeu de POST /auth/login, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Token not found"
    }
    ~~~

  * E caso passe um token inválido, receberá a seguinte mensagem:

    ~~~json
    {
      "message": "Invalid Token"
    }
    ~~~

  ### Fazendo a requisição

  * Vamos usar o produto deste exemplo:

   ~~~json
  {
    "id": "64337f9945742a7c2ca2c162",
    "categories": [
      "6433880fcc2ac8d441198d81"
    ],
    "name": "Risoto de Frango",
    "qty": 20,
    "price": 5
  }
  ~~~

  Ao deletar, retorna o próprio `JSON` acima

  </details>
  
