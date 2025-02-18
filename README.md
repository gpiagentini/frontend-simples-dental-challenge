# Simples Dental Challenge Frontend 

## Overview do Projeto

Projeto feito para o Challenge de FullStack da Simples Dental.

- Angular 19
- Node 22.13
- Angular Materials 19.1.4

## Descrição Funcional

O desafio é a criação de uma interface, com autenticação feita em localStorage, para buscar uma lista de álbuns e exibir as 10 primeiras fotos da lista.

### Autenticação

A autenticação é realizada por meio do localStorage. 
Automaticamente é feito o registro de um usuário:

- login: admin
- password: admin

Uma vez autenticado, o usuário tem 10 minutos para utilizar a aplicação antes da expiração da autenticação. Quando expirada, o usuário é redirecionado para a tela de login para fazer a autenticação novamente.

### Busca de álbuns

Utilizamos o endereço https://jsonplaceholder.typicode.com/albums para buscar os álbuns disponíveis. 
Cada álbum vai ter uma lista de fotos disponíveis, porém durante a exibição dos álbuns, teremos apenas o primeiro thumbnail representando o álbum.

### Busca de fotos

Quando selecionamos um álbum, vamos para uma tela específica, onde temos dados do álbum e uma lista com as 10 primeiras fotos do álbum.
As fotos podem ser buscadas no endereço https://jsonplaceholder.typicode.com/photos.

### Considerações

Durante a busca das fotos, no endereço https://jsonplaceholder.typicode.com/photos, não consegui retornar as imagens no url retornado, por exemplo https://via.placeholder.com/150/92c952. Acredito que o endereço não esteja mais ativo.
Para poder dar continuidade, realizar um mapeamento do <b>via.placeholder.com </b> para o <b>placehold.co</b>, mantendo o tamanho e cores originais.

## Building and Run

Antes de começar a testar a aplicação, devemos instalar as dependências com:

```bash
npm i
```
---

Depois de instalado, podemos rodar o seguinte comando, para rodar a aplicação em ambiente de desenvolvimento:

```bash
npm run start
```
---

Para fazer o build da aplicação, podemos rodar o comando abaixo:

```bash
npm run build
```
Esse comando irá gerar os arquivos necessários para deploy da aplicação, em /dist/frontend-simples-dental-challenge/browser.

## Contatos e Feedbacks

Agradeceria muito qualquer comentário/feedbacks/melhorias sobre o challenge acima.

Seguem dados de contato
- E-mail: gmtpiagentini@gmail.com
- Celular: (11) 99511-7433
- Site pessoal: www.gpiagentini.com

Muito obrigado pela oportunidade!

