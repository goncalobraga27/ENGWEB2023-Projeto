import json
def readfile():
    # Abertura do ficheiro JSON 
    with open('data/db.json') as file:
        # Ler o conteúdo do arquivo
        data = file.read()

        # Converter a string JSON em um objeto Python
        conteudo = json.loads(data)
    return conteudo

def makeBiconnections(dicConteudo):
    for id in dicConteudo.keys():
        reg = dicConteudo[id]
        lligacoes= reg["ligacoes"]
        for idL in lligacoes:
            if idL != id:
                regEditar= dicConteudo[idL]
                lligacoesEditar=regEditar["ligacoes"]
                # print("ID a acrescentar: "+str(id)+"| Lista de ligações: "+str(lligacoesEditar))
                if str(id) not in lligacoesEditar:
                    # print("Vou acrescentar")
                    lligacoesEditar.append(str(id))
    return dicConteudo
def writefile(dicConteudo):
    lista=[]
    for id in dicConteudo.keys():
        lista.append(dicConteudo[id])
    with open('data/db.json', 'w') as f:
        json.dump(lista, f,indent=4)
def main():
    dicConteudo = dict()
    conteudoLido=readfile()
    for reg in conteudoLido:
        if "_id" in reg.keys():
            dicConteudo[reg['_id']]= reg
    
    dicConteudo = makeBiconnections(dicConteudo)
    writefile(dicConteudo)

if __name__ == "__main__":
    main()
