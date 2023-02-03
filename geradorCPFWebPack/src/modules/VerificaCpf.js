export default class VerificaCpf {
    constructor(cpfEnviado) {
        //this.cpfEnviado = cpfEnviado;
        Object.defineProperty(this, 'cpfLimpo',{ //classe é muito parecido com construtor functions, então, a parte de define property e prototype é a mesma.
            enumerable: true,
            writable: false,
            configurabel: false,
            value: cpfEnviado.replace(/\D+/g, ''),

        })
    }
    
    valida(){
        if(!this.cpfLimpo) return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(!this.isSequencia()) return false;
        const cpfParcial = this.cpfLimpo.slice(0, 9);
        const digito1 = this.criaCPF(cpfParcial);

        const digito2 = this.criaCPF(cpfParcial + digito1);
        const cpfCompleto = cpfParcial + digito1 + digito2;
        
        if(!(cpfCompleto === this.cpfLimpo)) return false;
        return true;
    }

    isSequencia(){
        //return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo; //um outro meio de fazer.
        return this.cpfLimpo[0].repeat(this.cpfLimpo.length); //retorna se a string é uma sequancia.
    }

    //quando não recebemos a palavra THIS, significa que o método pode se tornar statico
    static criaCPF(cpfInserido){ //com o static, não precisamos instanciar outra classe pra chamar o método
        const cpfArray = Array.from(cpfInserido); //transforma a string em array de tamanho 9 ou 10
        let regressivo = cpfArray.length + 1; //igual a 10 ou 11
        const soma = cpfArray.reduce((acumulador, valor) => {
            acumulador += Number(valor) * regressivo;
            regressivo--;
            return acumulador;
        }, 0);
        const digito = (11 - (soma % 11));
        return digito > 9 ? '0' : String(digito);
    }
}

// const cpf1 = '117.334.340-70';
// const cpf2 = '700.682.320-04';
// const cpf3 = '466.415.740-16';
// const cadastroPessoFisica = new VeriifcaCpf(cpf1);
// if(cadastroPessoFisica.valida()) return console.log('É um CPF válido!');
// else console.log('Cpf inválido!');
