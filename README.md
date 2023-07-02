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
3. [Servidor Principar](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/mainServer)
4. [Servidor de Autenticação](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/authServer)

O tema escolhido pelo nosso grupo foi o [Tema 2: Inquirições de Génere](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/%5BEW%5D%20Enunciado.pdf).

## [Tratamento de dados](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/data)
### Script program.py
Recebendo o ficheiro de dados em formato [.csv](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/data/registos.csv) teriamos não só de o tratar como passar para [.json](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/data/db.json) e para isso utilizamos uma ***[script](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/program.py)*** escrita na linguagem *python*, há semelhança do que já tinhamos feito em aulas da UC.

Decidimos ter um tratamento de dados muito simples, preservando ao máximo aquilo que estava presente nos dados existentes no formato **.csv**. O facto de não tratarmos mais dos dados e dividirmos mais os dados deve se ao facto de já estar com uma quantidade enorme em cada processo e a simplificação em torno da divisão não nos pareceu uma opção viável.

De acordo com as indicações dadas no enunciado e depois de retirarmos dúvida com o professor, optamos apenas por mexer na parte das ligações. 
Assim criamos uma script **python** que vai analisar os campos *"ScopeContent"* e o *"UnitTitle"* de cada registo. 
Desta forma, com base nos nomes próprios existentes nestes campos iremos procurar no ficheiro fornecido, se existem registos em que o campo *"UnitTitle"* possui o nome próprio que estamos à procura. 
Caso o nome próprio esteja presente, registamos o **"_id"** do registo que possui o nome próprio que estamos à procura no campo **"ligacoes"** do registo abordado inicialmente. 

Com base no que vimos em cima, conseguimos criar uma rede de ligações entre registos existentes no ficheiro. 
### Script biconnections.py 
Esta script **python** serve para complementar a script **program.py**


No caso do ***ScopeContent*** tinhamos de procurar por aqueles nomes nos restantes do processo, e se encontrassemos colocar o id desse processo no original.

Já no *"NOMEDOOUTROCAMPOQUENAOMELEMBRO!!!!!"* verificavamos se se existia número do processo lá e se sim colocar-lo na lista de ligações.

!!!! EXPLICAR AS LIGAÇÕES BIDERECIONAIS !!!!!!!!!!!! + POR EXEMPLOS

## [API de dados](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/apiServer)

A resolução desta parte, à semelhança das outras, está de acordo com o feito nas aulas práticas. Sendo uma API de dados serve principalmente para devolver os dados da base de dados de acordo com os vários critérios.
Utilizando a base de dados guardada em mongo que foi descrita no exercicio anterior, utilizamos o modúlo *mongoose* para conectarmo-nos à base de dados. De seguida, tratamos da criação dos [modelos](https://github.com/goncalobraga27/ENGWEB2023-Projeto/blob/main/apiServer/models/process.js) dos vários objetos da BD. O objeto presente neste ficheiro e na BD tem um formato muito parecido ao que vinha por defeito no ficheiro dado, apenas com 2 campos acrescentado: o campo ligações, que representa as ligações do requerido da inquirição com outros requeridos; e o campo posts, uma vez que a cada processo pode ser feito uma lista de posts.

Os posts tem associado a si um id, titlo, tipo, descrição e uma lista de comentários. Os comentários tem um autor, assunto e descrição.

Relativamente às rotas e aos constrollers, estes segundos são usados para servir de auxilio as rotas. Os controllers são os pedidos diretos à base dados. As rotas usam os controllers para fazer pedidos à base de dados e depois devolvem o resultado dessa procura. De acordo com uma determinada rota, ou seja com um determinado url, é também feita uma pesquisa específica à base de dados.

Um caso especial que temos de mencionar aqui é uma pesquisa particionada que utilizamos para obter a paginação no main server (isto para diminuir o tempo de resposta, uma vez que menos dados levam a que o tempo de resposta seja mais pequeno). Estas diferem das restantes apenas pelo facto de utilizarem skip e limit. O metodo skip passa o x primeiros registos que obtemos com aquela pesquisa e o limit limita em y o número de registos a devolver. Imaginemos o caso de termos 1500 registos podemos usar o skip(750) e o limit(250) para obter do registo 750 até ao 1000. Decidimos que por página deveriamos ter 500 registos no máximo pelo que a função no controller recebe um número x e damos skip(500*x) ou seja se estamos na pagina 0, ele não dá skip de nenhum e se estamos na 2 ele dá skip de 1000. O limit neste caso é 500 porque no máximo apenas queremos ter 500 registos por página.


Não utilizamos *views* uma vez que este servidor serve apenas de suporte e nunca para ser apresentado.

**FALAR DA AUTENTICACAO**

## [Servidor Principal](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/mainServer)

Este serve como servidor onde vai ser executadas as operações que vão ser envidas e intrepertadas pelos outros. Comunica com o servidor de autenticação para decidir se um utilizador pode ou não pode aceder a um determinado tipo de informação (devido aos 2 níveis e há existência de utilizadores). Comunica com a API de dados para ir buscar a informação de acordo com determinados pârametros, sejam eles organizados por nome ou fazer uma pesquisa de um determinado termo na base de dados e mostrar a lista resultante dessa procura.

Este servidor é o único com *views* uma vez que é o servidor feito para demonstrar a informação. As nossas interface mantem a sua consistencia e asua simplicidade ao longo do trabalho. Utilizamos a biblioteca de css w3 (a utilizada nas aulas práticas) e a utilização do pug. Apesar da simplicidade, é bastante eficaz e permite uma navegação rápida no web site.

Tal como descrito no enunciado permite a ordenação segundo os vários tipos de ordem, a postagem de posts, o comentario destes mesmos entre outros. 
É de mencionar que intrepertamos a parte do utilizador "normal" apenas poder dar indicações sobre os vários registos, aproveitando os posts para esse efeito.

***POMOS IMAGENS?***


## [Servidor de Autenticação](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/authServer)
***BRAGA pls***

## Conclusão e Trabalho Futuro

Apesar de ter sido um trabalho do qual estamos bastantes satisfeitos, sentimos como sempre que há coisas a melhorar. Uma das ideias que temos sobre este trabalho, mas iria requerer um estudo mais aprofundado da utilização do website no seu dia a dia seria uma limpeza e uma expansão de campos. Um outro fator que consideramos é colocar a realização do login utilizando o facebook e o google.

Consideramos que este trabalho nos tenha corrido bem, pelo que concluimos todos os objetivos propostos pelo professor, bem como expandimos alguns deles, no caso de premitir a procura aos registos. Também é de mencionar a aplicação dos diversos servidores e maneiras de programação aprendidas no decorrer da unidade curricular. 
