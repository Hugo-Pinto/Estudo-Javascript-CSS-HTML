const aleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const geraMaiuscula = () => {
    return String.fromCharCode(aleatorio(65, 91)); //vai gerar uma letra aleatória de A a Z baseado nos números da tabela ASCII
}

const geraMinuscula = () => {
    return String.fromCharCode(aleatorio(97, 123)); //vai gerar uma letra aleatória de A a Z baseado nos números da tabela ASCII
}

const geraNumero = () => {
    return String.fromCharCode(aleatorio(48, 58)); //vai gerar uma letra aleatória de A a Z baseado nos números da tabela ASCII
}

const simbolos = '.,;:~^/?{[}]!@#$*()_+-*=';

const geraSimbolo = () => simbolos[aleatorio(0, simbolos.length)];

export default function geraSenha (qtd, maiuscula, minuscula, numero, simbolo){
    const senhaArray = [];
    qtd = Number(qtd);
    for (let i=0; i<qtd; i++){
        //da pra fazer com if else também.
        maiuscula && senhaArray.push(geraMaiuscula());
        minuscula && senhaArray.push(geraMinuscula());
        numero && senhaArray.push(geraNumero());
        simbolo && senhaArray.push(geraSimbolo());
        
    }
    return senhaArray.join('').slice(0, qtd);
}

geraSenha(10, true, true, true, true);
