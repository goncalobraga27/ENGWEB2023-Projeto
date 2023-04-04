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

falar com o ramalho-> perguntar duvidas do tratamento do dataset
sendo isto uma disciplina de ew vamos gastar mais tempo em tratamento do dataset
mas tratar -lo vai levar a um desempenho melhor do servidor

"""


def ligacoes(lig,fjson):
    #print(lig)
    res = list()
    


    i = 0
    for l in lig: #mudar isto por amor de deus
        laux = {'ligacoes' : {}}
        for n in l.keys():
            uax = dict()
            for nomes in l[n]:
                for e in fjson:
                    #print(e['UnitTitle'])
                    try :
                        if re.search(e['UnitTitle'],nomes) :
                            laux['ligacoes'].update({e["_id"]:nomes})
                    except:
                        print(e) 

            
        fjson[i].update(laux)
        res += [fjson[i]] 
        #print(res)
        #sleep(4)
        i+=1

    return res



def makeJson(cabecalho,rows):
    rgx = re.compile(r"(?<=Inquirição de genere de )(\w+|\s)*")
    f = open('data/db.json','w',encoding="utf-8")
    listaFicheiro=[]
    listaligacoes=[]
    cabecalho = ['_id']+cabecalho
    #print(cabecalho[7])
    #print(cabecalho.index("ScopeContent")) == 38
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
            """
                TRATAR DO DATASET -> RelatedMaterial !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            """
            r = re.search(rgx, paramLinha[8]).group()
            if(paramLinha[38] != ""):
                try :
                    rg = re.search(r"(?<=Filiação: )(\w+|\s)*(\w+|\s)*",paramLinha[38]).group().split(" e ")
                except:
                    pass
                dicligacoes[r] = rg
                listaligacoes.append(dicligacoes) 
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