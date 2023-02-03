import VerificaCpf from "./VerificaCpf";

export default class GeraCPF{
    rand(minimo = 100000000, maximo = 999999999){
        return String(Math.floor(Math.random() * (maximo - minimo) + minimo)); //gerando um número aleatório com 9 dígitos
    }
    
    geraNovoCpf(){
        const cpfSemDigito = this.rand(); //recebe o número aleatório
        const digito1 = VerificaCpf.criaCPF(cpfSemDigito);
        const digito2 = VerificaCpf.criaCPF(cpfSemDigito + digito1);
        const novoCpf = cpfSemDigito + digito1 + digito2;
        return this.formataCpf(novoCpf);
    }

    formataCpf(cpf){
        return (
            cpf.slice(0, 3) + '.' +
            cpf.slice(3, 6) + '.' +
            cpf.slice(6, 9) + '-' +
            cpf.slice(9, 11)
        );
    }
}