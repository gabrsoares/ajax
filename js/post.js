//import fetch from "node-fetch"
let form = document.getElementById('form')
let result = document.getElementById('resultado')

form.addEventListener('submit', function(event){
    
    event.preventDefault()
    
    let title = document.getElementById('title').value
    let body = document.getElementById('body').value

    
    fetch('https://jsonplaceholder.typicode.com/posts/', {
        method: 'POST',
        body: JSON.stringify({
            title:title,
            body:body
        }),
        headers: {
            'Content-Type' : 'application/json; charset=UTF-8'
        }
    })
        .then( response => response.json())
        .then(data => {
            console.log(data)
            result.innerHTML += `<div class= "resposta"><h2>${data.title}</h2>
            <p>${data.body}</p></div>
            `
        })
        .catch(error => console.error(error))   
})
