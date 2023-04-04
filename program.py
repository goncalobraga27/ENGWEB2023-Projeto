import csv
import json
import re
import time

def makeJson(cabecalho, rows):
    escrita = 0
    f = open('data/db.json', 'w', encoding="utf-8")
    cabecalho = ['_id'] + cabecalho
    listaFicheiro = []
    dicLigacoes = dict()
    auxdicLigacoes = dict()
    while escrita != 3:
        if escrita == 0:
            for row in rows:
                paramLinha = ""
                for it in row:
                    paramLinha += it
                paramLinha = paramLinha.split(";")
                if len(paramLinha) >= 4 and paramLinha[4] !='':
                    number = paramLinha[4]
                    number = number[1:]
                    number = number[:-1]
                    auxdicLigacoes[int(number)] = paramLinha[0]
            escrita += 1
        if escrita == 1:
            for row in rows:
                listaOId = []
                paramLinha = ""
                nameProcess = ""
                filiacaoProcess = ""
                numberOtherProcess = ""
                for it in row:
                    paramLinha += it
                searchNameProcess = re.search(r"Inquirição de genere de [a-zA-Z\s]+(\")?", paramLinha)
                searchFiliacaoProcess = re.search(r"Filiação:[a-zA-Z\s]+\.", paramLinha)
                if searchNameProcess:
                    nameProcess = searchNameProcess.group()[24:]
                    nameProcess = nameProcess[:-1]
                if searchFiliacaoProcess:
                    filiacaoProcess = searchFiliacaoProcess.group()[10:]
                    filiacaoProcess = filiacaoProcess[:-1]
                    filiacaoProcess = filiacaoProcess.split(" e ")
                paramLinha = paramLinha.split(";")
                if len(paramLinha) >= 63:
                    forligacao = paramLinha[63]
                    searchOtherProcess = re.findall(r"\d+", forligacao)
                    if searchOtherProcess:
                        for it in searchOtherProcess:
                            if int(it) in auxdicLigacoes:
                                listaOId.append(auxdicLigacoes[int(it)])
                if nameProcess != "":
                    dicLigacoes[nameProcess] = (paramLinha[0], filiacaoProcess, listaOId)
            escrita += 1
        elif escrita == 2:
            for row in rows:
                dic = dict()
                paramLinha = ""
                nameProcess = ""
                listaId = []
                for it in row:
                    paramLinha += it
                searchNameProcess = re.search(r"Inquirição de genere de [a-zA-Z\s]+(\")?", paramLinha)
                if searchNameProcess:
                    nameProcess = searchNameProcess.group()[24:]
                    nameProcess = nameProcess[:-1]
                paramLinha = paramLinha.split(";")
                if nameProcess != "":
                    listaP = (dicLigacoes[nameProcess])[1]

                    for it in listaP:
                        if it in dicLigacoes:
                            listaId.append((dicLigacoes[it])[0])
                    listaId += (dicLigacoes[nameProcess])[2]

                if len(paramLinha) > len(cabecalho):
                    for i in range(len(cabecalho) - 1):
                        dic[cabecalho[i]] = paramLinha[i]
                    dic["ligacoes"] = listaId
                    listaFicheiro.append(dic)
                else:
                    for i in range(len(paramLinha) - 1):
                        dic[cabecalho[i]] = paramLinha[i]
                    dic["ligacoes"] = listaId
                    listaFicheiro.append(dic)

            json.dump(listaFicheiro, f, indent=" ")
            f.close()
            escrita += 1


def main():
    f = open("data/registos.csv", "r", encoding="utf-8")
    csvreader = csv.reader(f)
    headerFile = next(csvreader)
    rows = []
    for row in csvreader:
        rows.append(row)
    cabecalho = headerFile[0]
    cabecalho = cabecalho.split(";")
    cabecalho = cabecalho[1:]
    makeJson(cabecalho, rows)
    f.close()


if __name__ == "__main__":
    main()
