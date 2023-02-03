import geraSenha from "./geradores";

const qtd = document.querySelector('.tamanho-senha');
const maisculo = document.querySelector('.contem-maiuscula');
const minusculo = document.querySelector('.contem-minuscula');
const simbolo = document.querySelector('.contem-simbolols');
const numero = document.querySelector('.contem-numeros');
const botao = document.querySelector('.gerar-senha');
const resultado = document.querySelector('.resultado');

export default () => {
    botao.addEventListener('click', () => {
        //const senhaGerada = senha();
        //resultado.innerHTML = senhaGerada;
        resultado.innerHTML = senha();
    });
};

function senha() {
    const senha = geraSenha(
        qtd.value, 
        maisculo.checked, 
        minusculo.checked, 
        numero.checked, 
        simbolo.checked
    )
    
    return senha || 'Selecione ao menos 1 opção!';
}