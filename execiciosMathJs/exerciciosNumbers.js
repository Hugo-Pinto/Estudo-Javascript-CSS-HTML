//.toFixed(qt de casas decimais.)
//toString(2) => retorna um binário do número
//math.floor -> arredonda pra baixo.
//math.ceil -> arredonda pra cima.
//math.max
//math.min
//math.round -> da metade pra cima arredonda, ex: 9.50 = 10
//math.random

const numero = Number(prompt('Digite um número:'));
const numeroTitulo = document.getElementById('numero-titulo');
const texto = document.getElementById('texto');

document.body.innerHTML = `${numero} é inteiro: ${Number.isInteger(numero)}<br/>`;
document.body.innerHTML += `É NAN: ${Number.isNaN(numero)} <br/>`;
document.body.innerHTML += `Arredondando pra baixo: ${Math.floor(numero)} <br/>`;
document.body.innerHTML += `Arredondando pra cima: ${Math.ceil(numero)} <br/>`;
document.body.innerHTML += `Com duas casas decimais: ${numero.toFixed(2)} <br/>`;


