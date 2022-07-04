const botaoLogin = document.querySelector('.formulario-login__botao-login');
const inputs = [document.querySelector('#nome-usuario'), document.querySelector('#senha-usuario')];
const loginMensagemDeErro = document.querySelector('.formulario-login__erro');

function limpaInputs(arrayInputs) {
    arrayInputs.forEach(function(input) {
        input.value = '';
    });
}

function criaObjetoQuePodeSerConvertidoParaJSON(cliente) {
    return {
        nome: cliente.nome,
        cpf: cliente.cpf
    }
}

function criaJSON(objeto) {
    return JSON.stringify(objeto);
}

function vaiParaOutraPagina(json) {
    localStorage.setItem('clienteLogado', json);
    window.location.href = './clienteLogado.html';
}

botaoLogin.addEventListener('click', function(event) {
    event.preventDefault();
    
    for(let i = 0; i < clientes.length; i++) {
        const cliente = clientes[i];
        loginMensagemDeErro.textContent = '';

        if(cliente.nome === inputs[0].value && cliente.senha === inputs[1].value) {
            limpaInputs(inputs);
            const clienteLogado = criaObjetoQuePodeSerConvertidoParaJSON(cliente);
            const json = criaJSON(clienteLogado);
            vaiParaOutraPagina(json);
            break;
        } else if (i === clientes.length - 1) {
            loginMensagemDeErro.textContent = '*Nome e/ou senha inválido.';
            console.error("Cliente não encontrado.");
        }
    }
});
