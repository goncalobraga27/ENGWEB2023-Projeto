import csv 
import json

def makeJson(cabecalho,rows):
    f = open('data/db.json','w')
    listaFicheiro=[]
    cabecalho = ['_id']+cabecalho
    print(cabecalho)
    for row in rows:
        dic = dict()
        paramLinha =""
        for it in row:
            paramLinha +=it
        paramLinha = paramLinha.split(";")
        if len(paramLinha) > len(cabecalho):
            for i in range(len(cabecalho)-1):
                dic[cabecalho[i]] = paramLinha[i]
            listaFicheiro.append(dic)
        else:
            for i in range(len(paramLinha)-1):
                dic[cabecalho[i]] = paramLinha[i]
            listaFicheiro.append(dic)
    json.dump(listaFicheiro, f)
    

def main():
    f = open("data/registos.csv","r")
    csvreader = csv.reader(f)
    headerFile = next(csvreader)
    rows = []
    for row in csvreader:
        rows.append(row)
    cabecalho = headerFile[0]
    cabecalho = cabecalho.split(";")
    cabecalho = cabecalho[1:]
    makeJson(cabecalho,rows)
   
    
        

if __name__ == "__main__":
    main()