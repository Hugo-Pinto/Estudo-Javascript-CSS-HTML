const elementos = [
    {tag: 'p', texto: 'Frase 1'},
    {tag: 'div', texto: 'Frase 2'},
    {tag: 'footer', texto: 'Frase 3'},
    {tag: 'section', texto: 'Frase 4'},
];

const container = document.querySelector('.container'); //pegando a section .container
const div = document.createElement('div'); //criando a div

/*Criando dentro da section container os elementos que serão adcionados */
for(let i =0; i<= 3; i++){
    let {tag, texto} = elementos[i]; //criamos duas variáveis denomidas tag e texto que recebem respectivamente a tag e o texto do objeto elementos
    let criaTag = document.createElement(tag);
    criaTag.innerHTML = texto;//adicionamos no HTML da tag que criamos o texto do objeto elementos

    div.appendChild(criaTag);//inserimos na div a tag html e o texto.
}

container.appendChild(div);//adicionando a div que criamos na section container