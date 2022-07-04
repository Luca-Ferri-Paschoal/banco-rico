const seletorDeOperacao = document.querySelector('.escolha-operacao');

//Esconder os inputs de transferência na inicialização da página;
const transferirCampos = [document.querySelector('.pesquisa-nome'), document.querySelector('.pesquisa-conta')];

//Variáveis para a lista de resultados possíveis na busca nos inputs de transferência;
const resultadosNome = document.querySelector('.resultados-nome');
const resultadosConta = document.querySelector('.resultados-conta');

const nomesOrdenados = organizaEMOrdemAlfabetica();
criaHTMLLista(resultadosNome, nomesOrdenados);

let itensDasListas = new Array(
    resultadosNome.querySelectorAll('.resultados__item')
);
let contasDoClienteParaTransferir;

for (let i = 0; i < transferirCampos.length; i++) {
    transferirCampos[i].classList.add('esconder');

    seletorDeOperacao.addEventListener('input', function () {
        if (this.value === 'Transferir') {
            transferirCampos[i].classList.remove('esconder');

        } else {
            transferirCampos[i].classList.add('esconder');
        }
    });

    transferirCampos[i].addEventListener('input', function () {
        const expressao = new RegExp(this.value, 'i');

        itensDasListas = itensDasListas.slice(0, 1);
        itensDasListas.push(resultadosConta.querySelectorAll('.resultados__item'));

        if (this.value !== '') {

            itensDasListas[i].forEach(function (item) {
                if (expressao.test(item.textContent)) {
                    item.classList.remove('esconder');
                } else {
                    item.classList.add('esconder');
                }
            });

        } else {
            esconderALista(i);
        }

        itensDasListas[i].forEach(function (item) {
            item.addEventListener('click', function () {
                transferirCampos[i].value = this.textContent;
                esconderALista(i);
            });
        });

    });

}

transferirCampos[0].addEventListener('input', function () {
    transferirCampos[1].value = '';
    limpaHTMLLista(resultadosConta);
});

transferirCampos[1].addEventListener('focus', function () {
    itensDasListas[0].forEach(function (item) {
        item.classList.add('esconder');
    });
    const nome = transferirCampos[0].value;
    const transferirParaEsseCliente = achaClientePeloNome(nome);
    limpaHTMLLista(resultadosConta);
    if (transferirParaEsseCliente === undefined) {

    } else {
        contasDoClienteParaTransferir = achaContasDoCliente(transferirParaEsseCliente);
        const contasDoClienteParaTransferirTratadas = contasDoClienteParaTransferir.map(function (conta) {
            return tratarONomeDoTipoDeConta(conta.constructor.name);
        });
        criaHTMLLista(resultadosConta, contasDoClienteParaTransferirTratadas);
    }
});

function esconderALista(i) {
    itensDasListas[i].forEach(function (item) {
        item.classList.add('esconder');
    });
}

function achaClientePeloNome(nome) {
    let esseCliente;

    clientes.forEach(function (cliente) {
        if (nome === cliente.nome) {
            esseCliente = cliente;
            return;
        }
    });

    return esseCliente;
}

function organizaEMOrdemAlfabetica() {
    const listaDeNomes = new Array();
    for (let i = 0; i < clientes.length; i++) {
        listaDeNomes.push(clientes[i].nome);
    }
    return listaDeNomes.sort();
}

function criaHTMLLista(ul, array) {
    array.forEach(function (item) {
        const li = document.createElement('li');
        const texto = document.createTextNode(item);
        li.classList.add('resultados__item');
        li.classList.add('esconder');
        li.appendChild(texto);
        ul.appendChild(li);
    });
}

function limpaHTMLLista(ul) {
    lis = ul.querySelectorAll('.resultados__item');
    lis.forEach(function (li) {
        ul.removeChild(li);
    });
}
