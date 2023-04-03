import requests
import json
def main():
    f = open('../data/db.json')
    # returns JSON object as 
    # a dictionary
    data = json.load(f)  
    # Closing file
    f.close()
    # Print dos dados do ficheiro
    i=0
    for item in data:
        response_API = requests.get('http://localhost:3000/processos/'+str(item["_id"]))
        if (response_API.text == 'null'):
            response_API = requests.post('http://localhost:3000/processos/',item)
            print("Status code: "+str(response_API.status_code)+" Reg nº: "+str(i))
        i=i+1
if __name__ == '__main__':
    main()

