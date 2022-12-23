function criaData (){

    //Pegando Todas os dados da data
    const data = new Date();
    const diaSemana = DiaDaSemana(data.getDay());
    const dia = data.getDate();
    const mes = qualMes(data.getMonth());
    const ano = data.getFullYear();
    const horas = data.getHours();
    const minutos = data.getMinutes();

    inseteData(diaSemana, dia, mes, ano, horas, minutos);
}

//função que insere a data no HTML
function inseteData (diaSemana, dia, mes, ano, hora, minuto) {
    const dataFormatada = document.querySelector('.saida');
    dataFormatada.innerHTML = `<p> ${diaSemana}, ${dia} de  ${mes} de ${ano} ${hora}:${minuto} </p>`;
}

//função que retorna o dia da semana em PT-BR
function DiaDaSemana(dia) {
    switch (dia){
        case 0:
        return 'Domingo';
        case 1:
        return 'Segunda-feira';
        case 2:
        return 'Terça-feira';
        case 3:
        return 'Quarta-feira';
        case 4:
        return 'Quinta-feira';
        case 5:
        return 'Sexta-feira';
        case 6:
        return 'Sábado';
    }
}
//função que retorna o mês do ano em PT-BR
function qualMes (mes) {
    switch (mes) {
        case 0:
        return 'Janeiro';
        case 1:
        return 'Fevereiro';
        case 2:
        return 'Março';
        case 3:
        return 'Abril';
        case 4:
        return 'Maio';
        case 5:
        return 'Junho';
        case 6:
        return 'Julho';
        case 7:
        return 'Agosto';
        case 8:
        return 'Setembro';
        case 9:
        return 'Outubro';
        case 10:
        return 'Novembro';
        case 11:
        return 'Dezembro';
    }
}

criaData();


/*
Solução do professor:

const dataFormatada = document.querySelector('.saida');
const data = new Date();
const opcoes = {
    dateStyle: 'full',
    timeStyle: 'short'
};

dataFormatada.innerHTML = data.toLocaleDateString('pt-BR', opcoes);
*/