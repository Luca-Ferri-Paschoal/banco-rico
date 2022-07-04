const todasAsContas = document.querySelectorAll('.dados-de-cada-conta');

const botaoOperar = document.querySelector('.formulario-operacoes__botao-operar');

const operacaoMensagemDeErro = document.querySelector('.operacoes-bancarias__erro');

todasAsContas.forEach(function (conta) {
    conta.addEventListener('click', function () {
        if (conta.classList[1] === 'selecionado') {
            conta.classList.remove('selecionado');
        } else {
            todasAsContas.forEach(function (conta) {
                conta.classList.remove('selecionado');
            });
            conta.classList.add('selecionado');
        }
    });
});

function selecioneConta() {
    const divContaSelecionada = document.querySelector('.selecionado');
    for (let i = 0; i < todasAsContas.length; i++) {
        if (divContaSelecionada === todasAsContas[i]) {
            return contasDoClienteLogado[i];
        }
    }
}

function realizeOperacao(contaSelecionada, valor, operacao) {
    switch (operacao) {
        case 'Depositar':
            contaSelecionada.depositar(valor);
            break;

        case 'Sacar':
            contaSelecionada.sacar(valor);
            break;

        case 'Transferir':
            transferir(contaSelecionada, valor);

        default:
            break;
    }
}

function transferir(contaSelecionada, valor) {
    contasDoClienteParaTransferir.forEach(function (conta) {
        if (tratarONomeDoTipoDeConta(conta.constructor.name) === transferirCampos[1].value) {
            contaSelecionada.transferir(valor, conta);
            return;
        }
    });
}

function atualizeSaldo() {
    for (let i = 0; i < saldos.length; i++) {
        saldos[i].textContent = 'Saldo: R$' + contasDoClienteLogado[i].saldo;
    }
}

let mensagemDeErro;

botaoOperar.addEventListener('click', function (event) {
    event.preventDefault();
    operacaoMensagemDeErro.textContent = '';

    const valor = parseFloat(document.querySelector('.valor').value);
    const operacao = seletorDeOperacao.value;
    const contaSelecionada = selecioneConta();

    for (let i = 0; i < itensDasListas.length; i++) {
        esconderALista(i);
    }

    if (verificaErros(contaSelecionada, valor, operacao)) {
        operacaoMensagemDeErro.textContent = mensagemDeErro;
        return;
    }

    realizeOperacao(contaSelecionada, valor, operacao);
    atualizeSaldo();
});

localStorage.removeItem('clienteLogado');
