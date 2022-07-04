const fichaCliente = document.querySelector('.ficha-cliente');

let contasDoClienteLogado;
let saldos;

function achaContasDoCliente(cliente) {
    const contasDesseCliente = new Array();
    contas.forEach(function (conta) {
        if (conta.cliente.nome === cliente.nome &&
            conta.cliente.cpf === cliente.cpf) {
            contasDesseCliente.push(conta);
        }
    });
    return contasDesseCliente;
}

function criaHTML(contas) {
    const divPai = document.createElement('div');
    divPai.classList.add('todas-as-contas');
    contas.forEach(function () {
        const divFilha = document.createElement('div');
        divFilha.classList.add('dados-de-cada-conta');
        for (let j = 0; j < 3; j++) {
            const listaDeClasses = ['tipo', 'agencia', 'saldo'];
            const paragrafo = document.createElement('p');
            paragrafo.classList.add('ficha-cliente__dado');
            paragrafo.classList.add(listaDeClasses[j]);
            divFilha.appendChild(paragrafo);
        }
        divPai.appendChild(divFilha);
    });
    fichaCliente.appendChild(divPai);
}

function preencheTitleEBoasVindas(cliente) {
    document.querySelector('title').textContent = 'Olá, ' + cliente.nome;

    let boasVindas = document.querySelector('.main__boas-vindas');
    boasVindas.textContent = `Seja bem-vindo(a), ${cliente.nome}, confira seus dados:`; 
}

function tratarCPF(cpf) {
    cpf = cpf.toString();
    cpf = cpf.split('');
    cpf.splice( 3, 0, '.');
    cpf.splice( 7, 0, '.');
    cpf.splice( 11, 0, '-');
    cpf = cpf.join('');
    return cpf;    
}

function preencheNomeECPF(cliente) {
    document.querySelector('.nome').textContent += ' ' + cliente.nome;
    document.querySelector('.cpf').textContent += ' ' + tratarCPF(cliente.cpf);
}

function tratarONomeDoTipoDeConta(nomeTipo) {
    if (nomeTipo === 'ContaSalario') {
        return 'Conta Salário';
    }
    if (nomeTipo === 'ContaPoupanca') {
        return 'Conta Poupança';
    }
    nomeTipo = nomeTipo.split('');
    nomeTipo.splice(5, 0, ' ');
    nomeTipo = nomeTipo.join('')
    return nomeTipo;
}

function preencheContas(contas) {
    const tiposDeConta = document.querySelectorAll('.tipo');
    const agencias = document.querySelectorAll('.agencia');
    saldos = document.querySelectorAll('.saldo');
    
    for (let i = 0; i < contas.length; i++) {
        tiposDeConta[i].textContent = tratarONomeDoTipoDeConta(contas[i].constructor.name);
        agencias[i].textContent = 'Agência: ' + contas[i].agencia;
        saldos[i].textContent = 'Saldo: R$' + contas[i].saldo;
    }
}

function preencheHTML(cliente, contas) {
    preencheTitleEBoasVindas(cliente);
    preencheNomeECPF(cliente);
    preencheContas(contas);

}

function preencherDadosDoCliente() {
    const clienteLogado = JSON.parse(localStorage.getItem('clienteLogado'));
    contasDoClienteLogado = achaContasDoCliente(clienteLogado);

    criaHTML(contasDoClienteLogado);
    preencheHTML(clienteLogado, contasDoClienteLogado);
    //localStorage.removeItem('clienteLogado');
}

preencherDadosDoCliente();
