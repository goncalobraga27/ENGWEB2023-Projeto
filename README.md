# ENGWEB2023-Projeto

Trabalho Prático de EngWeb2023 realizado por :

- Gonçalo Semelhe Sousa Braga : A97541
- João Miguel Ferreira Loureiro : A97257
- Simão Oliveira Alvim Barroso : A96834

## Introdução

Este documento serve como relatório para o projeto da Unidade Curricular de Engenharia Web, do 3º ano da Licenciatura em Engenharia Informática.

Ao longo deste relatório vamos explicar o nosso racicionio, as nossas intrepertações e a nossa resolução do problema dado no enunciado.

O relatório está dividido em 4 partes, cada uma das pastas deste repositório representa uma divisão do trabalho.

- São elas respetivamente:

1. [Tratamento de dados](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/data)
2. [API de dados](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/apiServer)
3. [Servidor Principal](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/mainServer)
4. [Servidor de Autenticação](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/authServer)

O tema escolhido pelo nosso grupo foi o [Tema 2: Inquirições de Génere](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/%5BEW%5D%20Enunciado.pdf).

## [Tratamento de dados](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/data)

### Script *program.py*

Recebendo o ficheiro de dados em formato [.csv](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/data/registos.csv) teriamos não só de o tratar como passar para [.json](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/data/db.json) e para isso utilizamos uma ***[script](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/program.py)*** escrita na linguagem *python*, há semelhança do que já tinhamos feito em aulas da UC.

Decidimos ter um tratamento de dados muito simples, preservando ao máximo aquilo que estava presente nos dados existentes no formato **.csv**. O facto de não tratarmos e  e dividido mais os dados deve se ao facto de já existir uma quantidade enorme em cada processo e a simplificação em torno da divisão não nos pareceu uma opção viável.

De acordo com as indicações dadas no enunciado e depois de retirarmos dúvida com o professor, optamos apenas por mexer na parte das ligações. 
Assim criamos uma script **python** que vai analisar os campos *"ScopeContent"* e o *"UnitTitle"* de cada registo. 
Desta forma, com base nos nomes próprios existentes nestes campos iremos procurar no ficheiro fornecido, se existem registos em que o campo *"UnitTitle"* possui o nome próprio que estamos à procura. 
Caso o nome próprio esteja presente, registamos o **"_id"** do registo que possui o nome próprio que estamos à procura no campo **"ligacoes"** do registo abordado inicialmente. 

Com base no que vimos em cima, conseguimos criar uma rede de ligações entre registos existentes no ficheiro. 
### Script *biconnections.py*

Esta script **python** serve para complementar a script **program.py**



No caso do *ScopeContent* tinhamos de procurar por aqueles nomes nos restantes do processo, e se encontrassemos colocar o id desse processo no original.

Já no *RelatedMaterial* verificavamos se se existia número do processo lá e se sim colocar-lo na lista de ligações.

**NOTA: Devido ao limite de tamanho de ficheiros no github, não conseguimos dar upload de uma nova versão do ficheiro de *JSON*, pelo que para o obter é preciso fazer os seguintes passos: Correr a script program.py e depois a biconnections.py e de seguida dar upload da BD para o mongo.**

## [API de dados](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/apiServer)

A resolução desta parte, à semelhança das outras, está de acordo com o feito nas aulas práticas. Sendo uma API de dados, serve principalmente para devolver os dados da base de dados de acordo com os vários critérios.
Utilizando a base de dados guardada em mongoDB, utilizamos o modúlo *mongoose* para conectarmo-nos à base de dados. De seguida, tratamos da criação dos [modelos](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/apiServer/models/process.js) dos vários objetos da BD. O objeto presente neste ficheiro e na BD tem um formato muito parecido ao que vinha por defeito no ficheiro dado, apenas com 2 campos acrescentado: o campo **ligações**, que representa as ligações do requerido da inquirição com outros requeridos; e o campo **posts**, uma vez que a cada processo pode ser feito uma lista de posts.

Os posts tem associado a si um id, titlo, tipo, descrição e uma lista de comentários. Os comentários tem um autor, assunto e descrição.

Relativamente às rotas e aos controllers, estes segundos são usados para servir de auxilio dos primeiros. Os controllers são os pedidos diretos à base dados. As rotas usam os controllers para fazer pedidos à base de dados e depois devolvem o resultado dessa procura. De acordo com uma determinada rota, ou seja com um determinado url, é também feita uma pesquisa específica à base de dados.

Um caso especial que temos de mencionar aqui é uma pesquisa particionada que utilizamos para obter a paginação no main server (isto para diminuir o tempo de resposta, uma vez que menos dados levam a que o tempo de resposta seja mais pequeno). Estas diferem das restantes apenas pelo facto de utilizarem skip e limit. O metodo *skip* passa os **x** primeiros registos que obtemos com aquela pesquisa e o *limit* limita em **y** o número de registos a devolver. Por exemplo, imaginemos o caso de termos 1500 registos podemos usar o *skip*(750) e o *limit*(250) para obter do registo 750 até ao 1000. Decidimos que por página deveriamos ter 500 registos no máximo pelo que a função no controller recebe um número **x** e damos *skip*(500*x) ou seja se estamos na pagina 0, ele não dá skip de nenhum e se estamos na 2 ele dá skip de 1000. O limit neste caso é 500 porque no máximo apenas queremos ter 500 registos por página.

Não utilizamos *views* neste servidor, uma vez que serve apenas de suporte e nunca para ser apresentado.

Este servidor tem de se encontrar protegido, desta forma é preciso um utilizador estar autenticado para poder aceder a este servidor. 

Assim para verificarmos se um utilizador se encontra autenticado, verificamos o token de autenticação que este possui. Caso o token se encontre inválido não é permitido o acesso á API de dados por parte do utilizador. 

Desta forma, conseguimos proteger este servidor do acesso indevido de utilizadores não permitidos. 

## [Servidor Principal](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/mainServer)

Este serve como o servidor onde vão ser executadas as operações que vão ser enviadas e interpretadas pelos outros. Comunica com o servidor de autenticação para decidir se um utilizador pode ou não pode aceder a um determinado tipo de informação (devido aos 2 níveis de acesso de utilizadores: Admin e User). Comunica com a API de dados para ir buscar a informação de acordo com determinados pârametros, sejam eles organizados por nome ou fazer uma pesquisa de um determinado termo na base de dados e mostrar a lista resultante dessa procura.

Este servidor é o único com *views* uma vez que é o servidor feito para apresentar a informação. As nossas interface mantem a sua consistencia e a sua simplicidade ao longo das páginas. Para as construirmos, utilizamos a biblioteca CSS [**w3-css**](https://www.w3schools.com/w3css/default.asp) e a utilização da linguagem [**pug**](https://pugjs.org/api/getting-started.html) para as construirmos (ambos utilizados nas aulas práticas). Apesar da sua simplicidade, é bastante eficaz e permite uma navegação rápida e intuitiva do site.

Tal como requisitado pelo o enunciado, o site permite a visualização e ordenação dos registos segundo vários tipos de ordem, a criação de posts e comentários destes mesmos, bem como a gestão (criação, edição e eliminação) de users e registos.

De notar que um utilizador não-administrador apenas poder ver os registos e dar indicações sobre eles, através de posts e comentários.

Este servidor apenas possiu uma página cuja autenticação não é requerida, a página */home* onde é apresentado o formulário de login. Assumimos também que a única maneira de criar contas é através de uma conta *admin* já existente no sistema, não sendo esta uma funcionalidade pública.

![login](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/imagensRelatorio/home.png)

Depois de dado o login, é nos apresentado um menu com várias opções, onde podemos ir para a página das inquirições, tratar dos utilizadores (seja criando ou eliminando) e até dar logout. As três ultimas são autoexplicativas, pelo que vamos explicar a página das inquirições.

Nesta página, temos opção de fazer várias coisas. Na *NavBar* são mostradas as opções de adicionar registo e de pesquisar por um registo **NAO TEMOS MAIS, NAO ME LEMBRO??**. Temos 2 opções de registo, uma mais avançada que demonstra os parâmetros todos, caso queiramos pesquisar por exemplo por um id específico. Já a pesquisa rápida, permite procurar por um determinado texto por todos os registos da base de dados. Há também outro fator que as diferencia, o facto de a pesquisa rápida usar regex enquanto a pesquisa avançada utiliza uma pesquisa na qual o texto precisa de estar exatamente como no registo.
Por baixo...

***POMOS IMAGENS?***
![bears](http://placebear.com/200/200)


## [Servidor de Autenticação](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/authServer)

Este servidor funciona de maneira parecida ao servidor de API de dados, só que em vez de tratar dos dados da , trata dos dados de autenticação. Na pasta models, temos a descrição de como é um registo numa base de dados:
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
Há também que mencionar o uso do módulo *passport-local-mongoose* que nos permite "mascarar a password". Ao utilizar este módulo, a password é guardada com um *hash* e um *salt* conhecido pelo sistema e por este apenas decripatdo. Ou seja, isto ajuda na segurança e impende que a captura de um pacote http se obtenha a password diretamente.

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

## Conclusão e Trabalho Futuro

**DOCKER???**

Apesar de ter sido um trabalho do qual estamos bastantes satisfeitos, sentimos como sempre que há coisas a melhorar. Uma das ideias que temos sobre este trabalho, mas iria requerer um estudo mais aprofundado da utilização do website no seu dia a dia seria uma limpeza e uma expansão de campos. Um outro fator que consideramos é colocar a realização do login utilizando o *facebook* e o *google*.

Consideramos que este trabalho nos tenha corrido bem, pelo que concluimos todos os objetivos propostos pelo professor, bem como expandimos alguns deles, no caso de premitir a procura aos registos. Também é de mencionar a aplicação dos diversos servidores e maneiras de programação aprendidas no decorrer da unidade curricular. 
