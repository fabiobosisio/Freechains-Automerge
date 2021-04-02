Freechains & Automerge - Experimentando um CmRDT JSON Based no Freechains
=========================================================================

O objetivo desse experimento é demonstrar a integração entre o
[Automerge](https://github.com/automerge/automerge) e o [Freechains
](https://github.com/Freechains/README)e obter ganho dessa coexistência.

O [Freechains](https://github.com/Freechains/README) é uma rede de disseminação
de conteúdo peer-to-peer, baseada nos modelos local-first baseado em tópicos
publish-subscribe. Utiliza o sistema de disseminação nõa estruturada baseada em
gossip, utiliza ordenação parcial de melhor esforço baseada em happened-before,
possui um sistema de reputação por tópico para garantir a qualidade e a saude da
rede e por fim permite diversos tipos de comunicação pública e privada (1-\> N,
1 \<-N, N \<-\> N, 1 \<-).

O [Automerge](https://github.com/automerge/automerge) funciona como um
commutative replicated data type, ou CmRDT, JSON based, ou seja, ele cria uma
estrutura de dados JSON armazenada em disco na forma de um arquivo de operações.

 

O que foi feito?
----------------

O experimento foi separado em dois atos:

-   O primeiro (nodemonitorfull.js) consiste em iniciar 3 nós do Freechains (ou
    mais) , Node 1, Node 2 e Node 3 e criar uma cadeia no formato forum público
    chamada \#crdt nos 3 nós.

    Compartilhar através dessa cadeia dados dos usuarios dos nós, como nome,
    chave pública e IP e sincronizar entre os pares, com o objetivo de que todos
    os pares tenham um json local com a informação pública dos participantes de
    todos os nós que possuam a cadeia.

     

-   O segundo (nodemonitorlite.js) consiste em iniciar 1 nó do Freechains , Node
    A, e criar uma cadeia no formato forum público chamada \#crdt neste nó.

    A ferramente irá gerar usuários aleatórios que compatilharão seus dados como
    nome, chave pública e IP com os demais usuários da cadeia afim de que todos
    possuam  um json com a informação pública de todos os participantes da
    cadeia.

 

Desenvolvimento
---------------

Desenvolvi duas ferramentas em nodejs no formato de arquivo único:

 

### nodemonitorfull.js

Essa ferramenta foi utilizada para o ato 1 dos testes, desenvolvida em nodejs
para ser executada em linha de comandos linux.

Trabalha com multiplos nós do freechais, com usuários unicos em cada um.
Compartilha os dados dos nós e usuários através de arquivos de operações
automerge transmitidos e lidos nas cadeias do freechains.

 

### nodemonitorlitejs

Essa ferramenta foi utilizada para o ato 2 dos testes, desenvolvida em nodejs
para ser executada em linha de comandos linux.

Trabalha com um único nó do freechains com multiplos usuarios nesse nós.
Compartilha os dados do nó e dos usuários através de arquivos de operações
automerge transmitidos e lidos nas cadeias do freechains.

 

Preparação do ambiente:
-----------------------

Os testes foram realizados em um Raspberry PI 2B rev 1.1 com 1GB de RAM
utilizando o Raspbian GNU/Linux 10 (buster) com os seguintes softwares:

-   Freechains v0.7.9

-   Automerge 0.14.2

-   NodeJS v14.15.4

 

Para a versão completa do nodemonitor é necessário iniciar 3 ou mais instancias
do freechains e todas deverão estar em join com uma cadeia formatada como fórum
privado chamada \$crdt.

Para a versão lite do nodemonitor basta uma instancia com join nessa mesma
cadeia.

 

Uso
---

### nodemonitorfull.js

Após iniciado os serviços freechains e a cadeia podemos chamar o comando no
formato abaixo:

 

**Com Sincronismo**

node nodemonitorfull.js “número do nó de origem” “endereço e porta do nó de
origem” “número do nó de destino” “endereço e porta do nó de destino” .

 

*Exemplo:*

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
node nodemonitorfull.js 1 localhost:8330 2 localhost:8331
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

Considerando o exemplo, será gerado em disco 3 arquivos:

1.  node1.json - Contendo o JSON com os dados do usuário do nó;

2.  node1.automerge - Contendo as operações automerge que gera o JSON;

3.  changes.network - Contendo as operações a serem postadas na cadeia do
    freechains;

 

A ferramenta irá coletar o elo mais recente da cadeia (localizado pelo heads) e
obter seu conteúdo (se houver).

Caso seja o Genesis da cadeia ele vai criar o arquivo automerge do zero, incluir
seus dados de usuário e postar na cadeia.

Caso já tenha ele criará um arquivo a partir desse conteúdo da cadeia, incluir
seus dados e postar na cadeia.

 

Por fim ele irá sincronizar sua cadeia LSF freechains com seu vizinho.

 

O formato do JSON é o abaixo:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
   "nodes":{
      "node1":{
         "nodename":"node1",
         "pubkey":"B29A091FAC8B34B78BEC2B54A821C0183A5C8F961671293E797F5AAD279A203A",
         "address":"localhost:8330"
      },
      "node2":{
         "nodename":"node2",
         "pubkey":"1831F7DAF4863AF77BA585B2A0FC0BF135B446C67121CF64CDF4B674F451B743",
         "address":"localhost:8331"
      },
      "node3":{
         "nodename":"node3",
         "pubkey":"76F39F550056D802D3D2F00A6A814991286B1E6419E47101716EB22589055C70",
         "address":"localhost:8332"
      }
   }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

 

**Sem Sincronismo**

node nodemonitorfull.js “numero do nó de origem” “endereço e porta do nó de
origem”.

 

*Exemplo:*

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
node nodemonitorfull.js 1 localhost:8330
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

Será feito todos os passos acima exceto o sincronismo com o vizinho.

 

### nodemonitorlitejs

Após iniciado o serviço freechains e a cadeia podemos chamar o comando no
formato abaixo:

 

node nodemonitorlite.js “numero do nó” “endereço e porta do nó”.

 

*Exemplo:*

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
node nodemonitorfull.js A localhost:8333
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

Será feito todos os passos acima exceto o sincronismo com o vizinho.

 

Considerando o exemplo, será gerado em disco 3 arquivos:

1.  “nomedousuario”.json - Contendo o JSON com os dados do usuário do nó;

2.  “nomedousuario”.automerge - Contendo as operações automerge que gera o JSON;

3.  changes.network - Contendo as operações a serem postadas na cadeia do
    freechains;

 

A ferramenta irá coletar o elo mais recente da cadeia (localizado pelo heads) e
obter seu conteúdo (se houver).

Caso seja o Genesis da cadeia ele vai criar o arquivo automerge do zero, gerar
usuarios aleatórios, incluir seus dados de usuário e postar na cadeia.

Caso já tenha ele criará um arquivo a partir desse conteúdo da cadeia, incluir
os dados do usuário gerado aleatóriamente e postar na cadeia.

 

Essa ferramenta não contempla sincronismo com outros servidores/vizinhos/pares,
ela testa multimplos usuários na mesma cadeia.

 

O formato do JSON é o abaixo:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
   "users":{
      "88":{
         "name":88,
         "pubkey":"D8429731CB0A0A63EB3F1CA18578D8433D2156D708468AF16E1D0BD7C03E2A91",
         "address":"localhost:8333"
      },
      "933":{
         "name":933,
         "pubkey":"E213A4D0CE0589179B45DE279A40A162CA6BC35C08C6849B4CB284FC70D2991C",
         "address":"localhost:8333"
      }
   }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
