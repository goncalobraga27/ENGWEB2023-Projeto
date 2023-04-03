import csv 
import json

def ligacoes(lig):
    print(lig)


def makeJson(cabecalho,rows):
    f = open('data/db.json','w',encoding="utf-8")
    listaFicheiro=[]
    cabecalho = ['_id']+cabecalho
    print(cabecalho)
    for row in rows:
        dic = dict()
        paramLinha =""
        for it in row:
            paramLinha +=it
        paramLinha = paramLinha.split(";")
        #print(cabecalho.index("RelatedMaterial"))
        if (len(paramLinha) > 63):
            ligacoes(paramLinha[38])
            #ligacoes(paramLinha[64])#nao sei se vale a pena tratar desta informacao
        if len(paramLinha) > len(cabecalho):
            for i in range(len(cabecalho)-1):
                dic[cabecalho[i]] = paramLinha[i]
            listaFicheiro.append(dic)
        else:
            for i in range(len(paramLinha)-1):
                dic[cabecalho[i]] = paramLinha[i]
            listaFicheiro.append(dic)
    json.dump(listaFicheiro, f,indent=" ")
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