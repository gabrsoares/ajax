
const form = document.querySelector('#form');
const cep = document.getElementById('cep');
const nome = document.getElementById('nome');
const cpf = document.getElementById('cpf');
const rua = document.getElementById('rua');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const email = document.getElementById('email');
const mensagem = document.getElementById('mensagem')
const notNull = document.getElementsByClassName('not-null')

function isEmpty(elem) {
    return elem.value.length < 1 ? ` O campo <strong>${elem.name}</strong> não pode ser vazio` : '';
}

function validaEmail(elem) {
    return elem.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '' : `Digite um <strong>email</strong> válido`;
}

function validaCep(elem) {
    if (!elem.value.match(/^[0-9]{8}/))
    return `Digite um <strong>CEP</strong> válido`;
    else return '';
}

// function updateAdress(data) {
//     if(!('erro' in data)) {
//         rua.value = (data.logradouro);
//         bairro.value = (data.bairro);
//         cidade.value = (data.localidade);
//         uf.value = (data.uf);
//     } else {
//         mensagem.innerHTML = `CEP não encontrado`
//     }
// }

form.addEventListener('submit', function(event){
    event.preventDefault();
    
    let msg = []
    let markup = ''
    
    Array.from(notNull).forEach(field => {
        let fieldState = isEmpty(field);
        if(fieldState)
        msg.push(fieldState);
    });
    
    const isEmail = validaEmail(email);
    if(isEmail) msg.push(isEmail)
    
    const isCep = validaCep(cep);
    if(isCep){
        msg.push(isCep)
    }
    
    
    
    
    msg.forEach(item => {
        markup += `<p>${item}</p>`
    })
    
    
    mensagem.innerHTML = markup;
});

cep.addEventListener('blur', () => {
    fetch(`https://viacep.com.br/ws/${cep.value.replace("-","")}/json`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    })
    .then( response =>  response.json())
    .then( data => {
        rua.value = (data.logradouro);
        bairro.value = (data.bairro);
        cidade.value = (data.localidade);
        uf.value = (data.uf);
    } )
    .catch((error) => {
        console.error('Erro', error.message || error)
        mensagem.innerHTML = `CEP não encontrado`
    })
    if(cep.value < 1) {
        rua.value = '';
        bairro.value = '';
        cidade.value = '';
        uf.value = '';
    }
    })