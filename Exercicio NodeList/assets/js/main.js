const paragrafos = document.querySelector('.paragrafos');
const ps = paragrafos.querySelectorAll('p'); //será criada uma node list com todos os paragrafos que estão na div. Funciona de forma semelhante a um array, mas não é.

//recolhendo a cor de fundo do body e inserindo em cada paragrafo como background.
const estilosBody = getComputedStyle(document.body);
const corDeFundo = estilosBody.backgroundColor; //pegando somente o background do body do documento HTML
const corFonte = estilosBody.color;

console.log(corFonte);

for (let p of ps) {
    p.style.backgroundColor = corDeFundo;//a cor de um objeto é alterada via JS pelo objeto STYLE.
    p.style.color = '#fff'; //cores inseridas manualmente, sempre em formato de string. 
}