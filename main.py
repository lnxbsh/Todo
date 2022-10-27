from flask import Flask, request, jsonify, render_template, redirect,  render_template_string
import json

#Tasks = [0:{ "name":"Cut", "desc":"Cut Veg", "isComplete":False }, 1:{"name":"Buy", "desc":"Buy Veg", "isComplete":True}]
Tasks = []
Task0 = { "id":0,"name":"Cut Veg", "isComplete": False }
Task1 = { "id":1,"name":"Buy Veg",  "isComplete": True }
Tasks.append(Task0)
Tasks.append(Task1)
indexID = 1
app = Flask(__name__)


@app.route('/',methods=['POST','GET','PUT','DELETE'])
def index():
    if request.method == 'POST':
        add(request.data)
        return {"message":"done"}
    elif request.method == 'PUT':
        update(request.data)
        return {"message":"done"}
    elif request.method == 'DELETE':
        delete(request.data.id)
        return "<alert> Deleted </alert>"
    else: 
        return jsonify(Tasks) 


@app.route('/home')
def home():
    return render_template("index.html")

def add(data):
    if (data):
        res = json.loads(data)
        task = dict()
        global indexID
        indexID += 1
        task['id'] = indexID
        task['name'] = res['name']
        task['isComplete'] = res['isComplete']
        Tasks.append(task)

def update(data):
    if data:
        res = json.loads(data)
        for t in Tasks:
            if t['id'] == res['id']:
                t['isComplete'] = res['isComplete']
                print(t)
             

def delete(data):
    if data:
        for t in Tasks:
            if t.get(data):
                del t



app.run(port=5000)