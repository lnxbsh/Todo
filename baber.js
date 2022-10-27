async function getData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url)
    return response.json(); // parses JSON response into native JavaScript objects
}

getData('/').then(data => {
    console.log(data)
    for (let d = 0; d < data.length; d++) {
        createList(data[d])
        completeTask(data[d])
        pendingList(data[d])
    }

})

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function updateData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}




function createList(data) {
    let li = document.createElement('li')
    let list = document.createElement('input');

    list.type = "checkbox"
    list.setAttribute("id", data.id)
    list.setAttribute("onChange", "s(this.id)")
    list.setAttribute("value", data.id)
    let l = document.createElement("lable")
    let tn = document.createTextNode(data.name)
    if (data.isComplete) {
        list.checked = true
    }
    //l.setAttribute("onclick","d()")

    //list.onclick = onList(this.id);
    let d = document.getElementById('checklist')
    let b = document.createElement('input')
    b.type = "button"
    b.value = "Delete Task"
    b.setAttribute('onclick', 'd()')
    li.appendChild(b)
    li.appendChild(list)
    l.appendChild(tn)
    li.appendChild(l)
    d.appendChild(li)

}


function add() {
    let t = document.getElementById('taskid').value
    let prepdata = { 'name': t, "isComplete": false }
    postData('/', prepdata)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            location.reload()
            t = ''
        });


}



function s(id) {
    let pd = { 'id': id, 'isComplete': true }
    console.log("hello")
    updateData('/', pd).then((data) => {
        if (data.message == 'done'){
            alert('updated')
        }
        console.log(data); // JSON data parsed by `data.json()` call

        
    });
}

function d() {
    let o = this.parentElement
    let z = document.removeChild(o) 
    console.log(z)

}

function completeTask(data) {
    let cmptlist = document.getElementById('CompletedTask')
    if (data.isComplete) {
        let li = document.createElement('li')
        l = document.createElement("label")
        tn = document.createTextNode(data.name)
        l.appendChild(tn)
        li.appendChild(l)
        cmptlist.appendChild(li)
    }
}


function pendingList(data) {
    let pndlst = document.getElementById("pnl")
    if (!data.isComplete) {
        let li = document.createElement('li')
        l = document.createElement("label")
        tn = document.createTextNode(data.name)
        l.appendChild(tn)
        li.appendChild(l)
        pndlst.appendChild(li)
    }
}
window.onload = getData()