import csv 
import json
import re
from time import sleep

"""
Notas a rever :
- Maneira como tratamos das ligacoes -> colocar mais eficiente
- Ingnorar registos que nao nos interessam (depois rever este parametro com a api de dados)

Pensar de quais dados deste csv e` que sao importantes para isto

-- tratar bem os dados (essencial para depois mandar menos cenas ao servidor)

falar com o ramalho

"""


def ligacoes(lig,fjson):
    print(fjson)
    res = list()
    #print(lig)
    # 8    
    for l in lig:
        pass

    return res



def makeJson(cabecalho,rows):
    rgx = re.compile(r"(?<=Inquirição de genere de )(\w+|\s)*")
    f = open('data/db.json','w',encoding="utf-8")
    listaFicheiro=[]
    listaligacoes=[]
    cabecalho = ['_id']+cabecalho
    #print(cabecalho[7])
    # print(cabecalho.index("ScopeContent")) == 38
    for row in rows:
        dic = dict()
        dicligacoes = dict()
        paramLinha =""
        for it in row:
            paramLinha +=it
        paramLinha = paramLinha.split(";")
        if len(paramLinha) > len(cabecalho):
            for i in range(len(cabecalho)-1):
                #rgx = r"(?<=Inquirição de genere de )(\w+|\s)*" #tratar da informacao
                dic[cabecalho[i]] = paramLinha[i]
            listaFicheiro.append(dic)
        else:
            for i in range(len(paramLinha)-1):
                dic[cabecalho[i]] = paramLinha[i]
            listaFicheiro.append(dic)
        
        if (len(paramLinha) > 63):
            #print(paramLinha[8])
            r = re.search(rgx, paramLinha[8]).group()
            #print(r)
            #sleep(2)
            print(paramLinha[38])
            if(paramLinha[38] != ""):
                try : # pensar noutra maneira
                    rg = re.search(r"(?<=Filiação: )(\w+|\s)*(\w+|\s)*",paramLinha[38]).group().split(" e ")
                except:
                    print(row)
                print(paramLinha[38])
                print(rg)
                dicligacoes[r] = rg
                listaligacoes.append(dicligacoes) 
            # vai ter que receber um key-value pair (dicionario) dos nomes e ir adicionando
            #ligacoes(paramLinha[64])#nao sei se vale a pena tratar desta informacao
    #for j in listaFicheiro: #depois melhorar isto, nada de eficiente
    #    ligacoes(listaligacoes,j)
    res = ligacoes(listaligacoes,listaFicheiro)
    json.dump(res, f,indent=" ")
    f.close()
    

def main():
    f = open("data/registos.csv","r",encoding="utf-8")
    csvreader = csv.reader(f)
    headerFile = next(csvreader)
    rows = []
    for row in csvreader:
        rows.append(row)
    cabecalho = headerFile[0]
    cabecalho = cabecalho.split(";")
    cabecalho = cabecalho[1:]
    makeJson(cabecalho,rows[3:]) # ignora as 4 primeiras linhas (sao palha)
    f.close()

if __name__ == "__main__":
    main()