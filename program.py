# Data : 1-4-2023
# Este programa serve para retirar quais os campos que existem nos ficheiros de dados fornecidos no dataset
import json

def searchRepetidos(lista,item):
    for i in lista:
        if i == item:
            return True
    return False
def knowAllKeys(data):
    listaResult = []
    for it in data:
        k=it.keys()
        for i in k:
            if searchRepetidos(listaResult,i) == False:
                listaResult.append(i)
    return listaResult

def main ():
    # atco1_acordaos.json | jcon_acordaos.json | jdgpj_acordaos.json
    f = open('data/jsta_acordaos_1.json','r')
    data = json.load(f)
    print("teste")
    f.close()
    print(knowAllKeys(data))
    
if __name__ == "__main__":
    main()

