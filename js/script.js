const url = 'https://api.github.com/users';
const main = document.getElementById('main')
const img = document.getElementById('img-profile')
// let user = 'marcelocant'
let text = ''

function getUser(user) {

    fetch(`${url}/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            text = `<div id="content"><img src=${data.avatar_url} class="img-profile" alt="imagem perfil"></img><p>${data.name} possui ${data.public_repos} repositórios públicos no GitHub como ${data.login}</p></div> <br>`
            main.innerHTML += text
        })
        .catch((error) => console.error('Erro: ', error.message || error))

}

const userInput = document.getElementById('username')

userInput.addEventListener('focusout', function(event){
    getUser(event.target.value)
})
