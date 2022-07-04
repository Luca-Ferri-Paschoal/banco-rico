function verificaErros(contaSelecionada, valor, operacao) {
    if (contaSelecionada === undefined) {
        mensagemDeErro = ('*Primeiro, você precisa selecionar uma conta.');
        return true;
    }

    operacao = operacao.toLowerCase();
    let valorSacado = (valor + valor * contaSelecionada.taxa);

    if (isNaN(valor) || valor <= 0) {
        mensagemDeErro = (`*Não foi possível ${operacao}. Por favor, preencha o campo 'valor' com um número válido.`);
        return true;
    } else if ((operacao === 'sacar' || operacao === 'transferir') && valorSacado > contaSelecionada.saldo) {
        mensagemDeErro = (`*Não foi possível ${operacao} '${valor}' porque '${valor}' * taxa (${contaSelecionada.taxa * 100}%) é maior do que o saldo.`);
        return true;
    }

    if(operacao === 'transferir') {
        return verificaErrosTransferir();
    }

    return false;
}

function verificaErrosTransferir() {
    let campoFaltando;

    transferirCampos.forEach(function(campo) {
        if (campo.value === '') {
            campoFaltando = true;
        } else {
            campoFaltando = false;
        }
    });

    if (campoFaltando) {
        mensagemDeErro = (`Está faltando preencher todos os campos necessários para a transferência.`);
        return true;
    }
    
    if (achaClientePeloNome(transferirCampos[0].value) === undefined) {
        mensagemDeErro = (`*Não foi possível fazer a transferência porque '${transferirCampos[0].value}' não é nosso cliente.`);
        return true;
    }
    
    let contaNaoExiste;

    for (let i = 0; i < contasDoClienteParaTransferir.length; i++) {
        if (transferirCampos[1].value === tratarONomeDoTipoDeConta(contasDoClienteParaTransferir[i].constructor.name)) {
            contaNaoExiste = false;
            break;
        } else {
            contaNaoExiste = true;
        }
    }
    
    if (contaNaoExiste) {
        mensagemDeErro = (`*Não foi possível fazer a transferência porque '${transferirCampos[1].value}' não é um tipo de conta de ${transferirCampos[0].value}.`);
        return true;
    }

    return false;

}