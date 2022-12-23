/*
vetor.unshift() -> adciona um elemento no começo do vetor.
vetor.push() -> adciona um elemento ao fim do vetor.
vetor.length -> retorna o tamanho do vetor.
vetor.pop() -> remove o ultimo elemento do vetor. variável = vetor.pop() -> variável ficará com o elemento removido.
vetor.shift() -> remove o primeiro elemento. Funciona igual ao vetor.pop.
delete vetor[indice] -> apaga o elemento na posição correspondente sem alterar os indices dos outros elementos.
vetor.slice(argumentos da função) -> fucniona igual com strings, porém, passando o indice e não caracteres como argumento.


funções em java script:

function nomeDaFuncao ( argumentos ) {
    console.log('hello world');
}

nomeDaFuncao();


Basico de objetos com função embutida neles.

const pessoa = {
    nome: 'hugo',
    sobrenome: 'gustavo',
    idade: 23,

    fala () {
        console.log(`Idade: ${this.idade}`);
    }, 

    aumentaIdade () {
        this.idade++;
    }
};

Acessando cada chave do objeto pessoa e os seus respectivos valores com for.

for (chave in pessoa) {
    console.log(chave, pessoa[chave]);
}

For clássico - Geralmente com iteráveis (arrays ou strings)
For in - Retorna o indice ou a chave (strings, arrays ou objetos)
For of - Retorna o valor em si (somente iteraveis)


Criado um objeto com função:

function criaPessoa (nome, sobrenome, idade){
    return {
        nome: nome,
        sobrenome: sobrenome,
        idade: idade
    };
}

const pessoa1 = criaPessoa ('hugo', 'gustavo', 23);

diferente de um array, um objeto utiliza chaves. Bem similar a struc em C.
*/

/*Impedindo que o formulário atualize a página sempre que clicamos no botão*/ 
function escopo () {

    const form = document.querySelector('.form'); //variável formulário recebe o formulário do documento HTML
    const resultado = document.querySelector('.resultado');
    const pessoas = [];

    function dados (evento) {

        evento.preventDefault();

        const nome = form.querySelector('.nome');
        const sobrenome = form.querySelector('.sobrenome');
        const peso = form.querySelector('.peso');
        const altura = form.querySelector('.altura');

        //adcionamos ao fim do vetor um objeto completo passando chave e valor, um vetor dentro de um vetor, uma matriz.
        pessoas.push({
            nome: nome.value,
            sobrenome: sobrenome.value, 
            peso: peso.value, 
            altura: altura.value
        });

        console.log(pessoas);

        //inserindo os valores diretamente na div
        resultado.innerHTML += `<p> ${nome.value} ${sobrenome.value} ${peso.value} ${altura.value} </p>`;
    }

    //quando o formulário for enviado, realizamos um evento para prevenir a atualização.
    form.addEventListener('submit', dados);
 }

escopo();