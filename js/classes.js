class Cliente {
    #nome;
    #cpf;
    #senha;

    constructor(nome, cpf, senha) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#senha = senha;
    }

    get nome() {
        return this.#nome;
    }

    get cpf() {
        return this.#cpf;
    }

    get senha() {
        return this.#senha;
    }
}

class Conta {
    #cliente;
    #agencia;
    #saldo;

    constructor(nome, clientes, agencia, saldo) {
        if (this.constructor === Conta) {
            throw new Error('Você não pode instanciar uma classe Conta, porque ela é abstrata.')
        }

        let clienteDesejado;

        for (let i = 0; i < clientes.length; i++) {
            let cliente = clientes[i];
            if (nome === cliente.nome) {
                clienteDesejado = cliente;
                break;
            }
        }

        this.#cliente = clienteDesejado;
        this.#agencia = agencia;
        this.#saldo = saldo;
    }

    get cliente() {
        return this.#cliente;
    }

    get agencia() {
        return this.#agencia;
    }

    get saldo() {
        return this.#saldo.toFixed(2);
    }

    sacar(valor, taxa) {
        this.#verificaSeEhNumeroESeEhmaiorDoQueZero(valor, this.sacar.name);

        const valorSacado = valor + valor * taxa;

        if (valorSacado > this.#saldo) {
            throw new Error(`Não foi possível realizar essa operação porque '${valor}' * taxa (${taxa * 100}%) é maior do que o saldo.`);
        }

        this.#saldo -= valorSacado;
    }

    depositar(valor) {
        this.#verificaSeEhNumeroESeEhmaiorDoQueZero(valor, this.depositar.name);

        this.#saldo += valor;
    }

    transferir(valor, conta) {
        this.#verificaSeEhNumeroESeEhmaiorDoQueZero(valor, this.transferir.name);

        this.sacar(valor);
        conta.depositar(valor);
    }

    #verificaSeEhNumeroESeEhmaiorDoQueZero(valor, operacao) {
        if (isNaN(valor)) {
            throw new Error(`Não foi possível ${operacao} '${valor}', porque '${valor}' não é um número.`);
        } else if (valor <= 0) {
            throw new Error(`Não foi possível ${operacao} '${valor}' porque '${valor}' é menor ou igual a 0.`);
        }
    }
}

class ContaSalario extends Conta {
    #taxa;

    constructor(nome, clientes, agencia, saldo) {
        super(nome, clientes, agencia, saldo);
        this.#taxa = 2 / 100;
    }

    get taxa() {
        return this.#taxa;
    }

    sacar(valor) {
        super.sacar(valor, this.#taxa);
    }
}

class ContaCorrente extends Conta {
    #taxa;

    constructor(nome, clientes, agencia, saldo) {
        super(nome, clientes, agencia, saldo);
        this.#taxa = 3 / 100;
    }

    get taxa() {
        return this.#taxa;
    }

    sacar(valor) {
        super.sacar(valor, this.#taxa);
    }
}

class ContaPoupanca extends Conta {
    #taxa;

    constructor(nome, clientes, agencia, saldo) {
        super(nome, clientes, agencia, saldo);
        this.#taxa = 4 / 100;
    }

    get taxa() {
        return this.#taxa;
    }

    sacar(valor) {
        super.sacar(valor, this.#taxa);
    }
}

class ContaEmpresa extends Conta {
    #taxa;

    constructor(nome, clientes, agencia, saldo) {
        super(nome, clientes, agencia, saldo);
        this.#taxa = 5 / 100;
    }

    get taxa() {
        return this.#taxa;
    }

    sacar(valor) {
        super.sacar(valor, this.#taxa);
    }
}
