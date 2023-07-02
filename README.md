# ENGWEB2023-Projeto

Trabalho Prático de EngWeb2023 realizado por :

- Gonçalo Semelhe Sousa Braga : A97541
- João Miguel Ferreira Loureiro : A97257
- Simão Oliveira Alvim Barroso : A96834

## Introdução

Este documento serve como relatório para o projeto da Unidade Curricular de Engenharia Web, do 3º ano da Licenciatura em Engenharia Informática.

Ao longo deste relatório vamos explicar o nosso raciocínio, as nossas interpretações e a nossa resolução do problema dado no enunciado.

O relatório está dividido em 4 partes, cada uma das pastas deste repositório representa uma divisão do trabalho.

- São elas respetivamente:

1. [Tratamento de dados](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/data)
2. [API de dados](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/apiServer)
3. [Servidor Principal](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/mainServer)
4. [Servidor de Autenticação](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/authServer)

O tema escolhido pelo nosso grupo foi o [Tema 2: Inquirições de Génere](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/%5BEW%5D%20Enunciado.pdf).

## [Tratamento de dados](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/data)

### Script *program.py*

Recebendo o ficheiro de dados em formato [.csv](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/data/registos.csv) teríamos não só de o tratar como passar para [.json](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/data/db.json) e para isso utilizamos uma ***[script](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/program.py)*** escrita na linguagem *python*, há semelhança do que já tínhamos feito em aulas da UC.

Decidimos ter um tratamento de dados muito simples, preservando ao máximo aquilo que estava presente nos dados existentes no formato **.csv**. O facto de não tratarmos e  dividido mais os dados deve se ao facto de já existir uma quantidade enorme em cada processo e a simplificação em torno da divisão não nos pareceu uma opção viável.

De acordo com as indicações dadas no enunciado e depois de retirarmos dúvida com o professor, optamos apenas por mexer na parte das ligações. 
Assim criamos uma script **python** que vai analisar os campos *"ScopeContent"* e o *"UnitTitle"* de cada registo. 
Desta forma, com base nos nomes próprios existentes nestes campos iremos procurar no ficheiro fornecido, se existem registos em que o campo *"UnitTitle"* possui o nome próprio que estamos à procura. 
Caso o nome próprio esteja presente, registamos o **"_id"** do registo que possui o nome próprio que estamos à procura no campo **"ligacoes"** do registo abordado inicialmente. 

Com base no que vimos em cima, conseguimos criar uma rede de ligações entre registos existentes no ficheiro. 
### Script *biconnections.py*

Esta script **python** serve para complementar a script **program.py**



No caso do *ScopeContent* tínhamos de procurar por aqueles nomes nos restantes do processo, e se encontrassemos colocar o id desse processo no original.

Já no *RelatedMaterial* verificávamos se se existia número do processo lá e se sim colocá-lo na lista de ligações.

**NOTA: Devido ao limite de tamanho de ficheiros no github, não conseguimos dar upload de uma nova versão do ficheiro de *JSON*, pelo que para o obter é preciso fazer os seguintes passos: Correr a script program.py e depois a biconnections.py e de seguida dar upload da BD para o mongo.**

## [API de dados](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/apiServer)

A resolução desta parte, à semelhança das outras, está de acordo com o feito nas aulas práticas. Sendo uma API de dados, serve principalmente para devolver os dados da base de dados de acordo com os vários critérios.
Utilizando a base de dados guardada em mongoDB, utilizamos o módulo *mongoose* para conectarmo-nos à base de dados. De seguida, tratamos da criação dos [modelos](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/apiServer/models/process.js) dos vários objetos da BD. O objeto presente neste ficheiro e na BD tem um formato muito parecido ao que vinha por defeito no ficheiro dado, apenas com 2 campos acrescentado: o campo **ligações**, que representa as ligações do requerido da inquirição com outros requeridos; e o campo **posts**, uma vez que a cada processo pode ser feito uma lista de posts.

Os posts tem associado a si um id, titulo, tipo, descrição e uma lista de comentários. Os comentários tem um autor, assunto e descrição.

Relativamente às rotas e aos controllers, estes segundos são usados para servir de auxilio dos primeiros. Os controllers são os pedidos diretos à base dados. As rotas usam os controllers para fazer pedidos à base de dados e depois devolvem o resultado dessa procura. De acordo com uma determinada rota, ou seja com um determinado url, é também feita uma pesquisa específica à base de dados.

Um caso especial que temos de mencionar aqui é uma pesquisa particionada que utilizamos para obter a paginação no main server (isto para diminuir o tempo de resposta, uma vez que menos dados levam a que o tempo de resposta seja mais pequeno). Estas diferem das restantes apenas pelo facto de utilizarem skip e limit. O método *skip* passa os **x** primeiros registos que obtemos com aquela pesquisa e o *limit* limita em **y** o número de registos a devolver. Por exemplo, imaginemos o caso de termos 1500 registos podemos usar o *skip*(750) e o *limit*(250) para obter do registo 750 até ao 1000. Decidimos que por página deveríamos ter 500 registos no máximo pelo que a função no controller recebe um número **x** e damos *skip*(500*x) ou seja se estamos na pagina 0, ele não dá skip de nenhum e se estamos na 2 ele dá skip de 1000. O limit neste caso é 500 porque no máximo apenas queremos ter 500 registos por página.

Não utilizamos *views* neste servidor, uma vez que serve apenas de suporte e nunca para ser apresentado.

Este servidor tem de se encontrar protegido, desta forma é preciso um utilizador estar autenticado para poder aceder a este servidor. 

Assim para verificarmos se um utilizador se encontra autenticado, verificamos o token de autenticação que este possui. Caso o token se encontre inválido não é permitido o acesso á API de dados por parte do utilizador. 

Desta forma, conseguimos proteger este servidor do acesso indevido de utilizadores não permitidos. 

## [Servidor Principal](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/mainServer)

Este serve como o servidor onde vão ser executadas as operações que vão ser enviadas e interpretadas pelos outros. Comunica com o servidor de autenticação para decidir se um utilizador pode ou não pode aceder a um determinado tipo de informação (devido aos 2 níveis de acesso de utilizadores: Admin e User). Comunica com a API de dados para ir buscar a informação de acordo com determinados parâmetros, sejam eles organizados por nome ou fazer uma pesquisa de um determinado termo na base de dados e mostrar a lista resultante dessa procura.

Este servidor é o único com *views* uma vez que é o servidor feito para apresentar a informação. As nossas interface mantem a sua consistência e a sua simplicidade ao longo das páginas. Para as construirmos, utilizamos a biblioteca CSS [**w3-css**](https://www.w3schools.com/w3css/default.asp) e a utilização da linguagem [**pug**](https://pugjs.org/api/getting-started.html) para as construirmos (ambos utilizados nas aulas práticas). Apesar da sua simplicidade, é bastante eficaz e permite uma navegação rápida e intuitiva do site.

Tal como requisitado pelo o enunciado, o site permite a visualização e ordenação dos registos segundo vários tipos de ordem, a criação de posts e comentários destes mesmos, bem como a gestão (criação, edição e eliminação) de users e registos.

De notar que um utilizador não-administrador apenas poder ver os registos e dar indicações sobre eles, através de posts e comentários.

Este servidor apenas possui uma página cuja autenticação não é requerida, a página */home* onde é apresentado o formulário de login. Assumimos também que a única maneira de criar contas é através de uma conta *admin* já existente no sistema, não sendo esta uma funcionalidade pública.

![login](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/imagensRelatorio/login.png)

Depois de dado o login, é nos apresentado uma página principal com um menu com várias opções, onde podemos ir para a página das inquirições, tratar dos utilizadores (seja criando ou eliminando, e exclusivamente para um admin) ou dar logout. As três últimas são autoexplicativas, pelo que vamos explicar a página das inquirições.

![home](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/imagensRelatorio/home.png)

Nesta página, são apresentados os registos existentes e algumas dos seus atributos que consideramos mais relevantes, bem como as ações disponíveis relacionadas com eles. Estes podem ser ordenados conforme o critério desejado pelo o utilizador ou premidos de forma a abrir a página relacionada com o registo correspondente (donde um admin pode editar ou apagar-lo). O utilizador pode também optar por executar uma pesquisa avançada, onde pode preencher os campos com a informação exata/igual de um registo que pretende observar (por exemplo um id ou título específico). Possui também no seu fim, botões de paginação, bem como uma *textbox* onde se pode escrever o número da página a que deseja aceder.

De notar também a *NavBar* presente em todas as páginas futuras, que apresenta atalhos para a pagina principal, página de registos, página de adição de registos (exclusivo admin) e uma barra de pesquisa rápida, que é mais geral que a avançada e abrange todos os parâmetros.

![registos](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/imagensRelatorio/registos.png)

![pagRegisto](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/imagensRelatorio/pagRegisto.png)

O utlizador pode também optar por ver os posts de um determinado registo, donde será deparado com a página de Posts, podendo acrescentar novos a esta.

![posts](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/imagensRelatorio/posts.png)

![addPost](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/imagensRelatorio/addPost.png)

Pode também aceder aos comentários de um determinado post, podendo nesta página acrescentar um da sua autoria ou através de uma página separada através de um botão existente na página dos posts.

![comments](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/imagensRelatorio/comments.png)

Se o utilizador for um admin, pode também gerir os utilizadores existentes na base de dados, podendo editar, apagar, ativar ou desativar um user á sua escolha.

![users](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/imagensRelatorio/users.png)

Em caso de erro, fizemos também uma página informativa com o auxilio de *JQuery* com os tipos de erros mais comuns com que nos deparamos nos testes dos projetos, bem como sugestões de como prosseguir.

![error](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/imagensRelatorio/error.png)

## [Servidor de Autenticação](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/authServer)

Este servidor funciona de maneira parecida ao servidor de API de dados, só que em vez de tratar dos dados da BD, trata dos dados de autenticação. Na pasta models, temos a descrição de como é um registo numa base de dados:
```js
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    username: String, 
    password: String,
    level: String, 
    dateCreated: String, 
    lastAccess: String, 
    active: Boolean,
    profilePic: String
})
```
Há também que mencionar o uso do módulo *passport-local-mongoose* que nos permite "mascarar a password". Ao utilizar este módulo, a password é guardada com um *hash* e um *salt* conhecido pelo sistema e por este apenas decriptado. Ou seja, isto ajuda na segurança e impende que a captura de um pacote http se obtenha a password diretamente.

Relativamente ao controllers, temos os seguintes:

- getUser: Obtem o registo de um utilizador
- addUser: Para criar um utilizador
- loginUser: Para dar o login de um utilizador na aplicação
- updateUser: Para mudar o username do utilizador
- deleteUser: Para eliminarmos um utilizador
- deactivateUser : Para desativarmos um utilizador
- activateUser : Para aticar um utilizador

Estes controllers são utilizados pelas rotas, rotas as quais vão ser acedidas pelo servidor principal. Por exemplo, no caso do login, o utilizador no formulário do servidor principal coloca os seus dados, dados os quais vão ser enviados pelo servidor principal para a rota */login*  que utiliza uma função de autenticação que verifica este acesso.

O login de um determinado utilizador tem de passar por vários procedimentos, isto é: 
- Encriptação da informação de um utilizador no servidor principal da aplicação;
- Passagem desta informação encriptada para o servidor de autenticação;
- Descodificação da informação e consequente procura da informação na base de dados que possui os registos dos users
- Caso o utilizador esteja registado na aplicação é emitido um novo token de sessão, permitindo assim ao utilizador aceder a todos os serviços fornecidos pela aplicação 

É de valor mencionar também que os tokens têm a duração máxima de 1h, pelo que ao final de uma hora será preciso voltar a fazer login.

É de mencionar a nossa não utilização de views à semelhança do que fizemos no servidor da API de dados, uma vez que este servidor serve apenas para verificar, por exemplo, se o login está correto e não fazer uma interface grátis para demonstrar isto. A informação de estar errado ou certo o login é demonstrado no servidor principal que analisa a resposta deste e mostra consoante.
## Docker 

Para a implementação do Docker no nosso trabalho prático tivemos que realizar certos procedimentos tais como:

- Criação de um Dockerfile para cada um dos servidores 
```Dockerfile
FROM node:20-bullseye 
WORKDIR /app
COPY . .
RUN npm i 
EXPOSE 3000  
CMD ["npm", "start"]
```
O parâmetro EXPOSE varia de servidor para servidor 
- Alteração do URL de ligação de cada servidor á base de dados 
(Antes)
var mongoDB='mongodb://127.0.0.1/tp'
(Depois)
var mongoDB= process.env.MONGODB_URL
- Criação de um docker-compose.yml para o conjunto dos três servidores, tendo em atenção á conexão com o mongoDB
``` Dockerfile
version: "3"
services:
  app:
    container_name: mainServer
    build: ./mainServer
    restart: always
    ports:
      - "7777:7777"
    networks:
      - tpnet

  data_server:
    container_name: tp_data_server
    build: ./apiServer
    restart: always
    environment:
      - MONGODB_URL=mongodb://mongodb:27017/tp
    depends_on:
      - mongodb
    networks:
      - tpnet

  mongodb:
    container_name: tp-mongodb
    image: mongo
    restart: always
    volumes:
      - tpData:/data/db
    networks:
      - tpnet

  auth_server:
    container_name: tp_auth_server
    build: ./authServer
    restart: always
    environment:
      - MONGODB_URL=mongodb://mongodb:27017/authEW_TP
    depends_on:
      - mongodb
    networks:
      - tpnet
      
networks:
  tpnet:
    name: tpnet
    driver: bridge
volumes:
  tpData:
  
```
- Alteração dos acess points que o mainServer possuia
Os acess points que o mainServer possui para fazer a conexão com os outros servidores foram alterados da seguinte forma:
(Antes)
module.exports.apiAccessPoint = "http://localhost:3000/api"
module.exports.authAccessPoint = "http://localhost:7778/users" 
(Depois)
module.exports.apiAccessPoint = "http://data_server:3000/api"
module.exports.authAccessPoint = "http://auth_server:7778/users"
- Inserção da base de dados no docker
Como nós possuímos um ficheiro **.json** que serve de suporte a aplicação então importamos esse ficheiro para o docker da seguinte forma:
```
sudo docker cp db.json tp-mongodb:/db.json
docker exec -it tp-mongodb  mongoimport --db tp --collection processes --file /db.json --jsonArray
```
Assim conseguimos colocar todos os servidores em execução com apenas um comando. O comando por nós utilizado é o seguinte: sudo docker compose up --build

Com base no que foi demonstrado em cima, é possível perceber como é que o Docker foi implementado no nosso projeto. 
## Conclusão e Trabalho Futuro

Em geral, estamos bastantes satisfeitos com o estado final do trabalho, apesar de não termos conseguido implementar mais funcionalidades. Algumas delas consistiam na implementação de uma limpeza e uma expansão de campos (o que iria requerer um estudo mais aprofundado da utilização do website no seu dia a dia), a possibilidade de fazer login utilizando o *Facebook* ou uma *Google Account* (abandonada devido ao tempo que iria demorar a implementar e que decidimos aproveitar para outras funcionalidades).

Consideramos que este trabalho tenha corrido bem, pelo que concluimos todos os objetivos propostos pelo professor, bem como a expansão de alguns deles (como por exemplo a procura aos registos). Também é de mencionar a aplicação de diversos servidores e de todos os conhecimentos adquiridos no decorrer da unidade curricular. 
