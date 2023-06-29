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

## [Servidor Principar](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/mainServer)

## [Servidor de Autenticação](https://github.com/goncalobraga27/ENGWEB2023-Projeto/tree/main/authServer)

## Conclusão e Trabalho Futuro 

MB+
