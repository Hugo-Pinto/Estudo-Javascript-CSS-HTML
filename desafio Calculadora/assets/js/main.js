/*
A calculadora será montada com factory function especificamente por conta do exercicio.
funções repassadas juntamente com o professor

criaCalculadora(); -> inicia uma função que retorna um objeto calculadora
inicia(); -> inicializa a calculadora
pressionaEnter(); -> pega a tecla enter do teclado ao tentar enviar um numero
clearDisplay(); -> limpa o display da tela
deleteLastCharacter(); -> apaga o ultimo caractere inserido no display
realizaConta(); -> tenta efetuar a conta
cliqueBotoes(); -> pega o evento de clicar nos botões.
insereBtnDisplay(); -> insere o innerText dos botões no display.
-----------------------------------------------------------------
DESAFIO PROFESSOR - REFAZER A CALCULADORA COM CONSTRUCTOR FUNCTIONS.
-----------------------------------------------------------------


-----------------------------------------------------------------
DESAFIO PESSOAL - TENTAR FAZER A CALCULADORA TOTALMENTE FUNCIONAL
-----------------------------------------------------------------


*/
/*
function criaCalculadora(){
    return {

        display: document.querySelector('.display'),


        inicia(){
            this.cliqueBotoes();
            this.pressionaEnter();
        },

        pressionaEnter(){
            this.display.addEventListener('keyup', (e) => {
                if (e.keyCode === 13){
                    this.realizaConta();
                }
            });
        },

        clearDisplay(){
            this.display.value = '';
        },

        deleteLastCharacter(){
            this.display.value = this.display.value.slice(0, -1);//receberá o tamanho da string -1, menos o ultimo caractere inserido.
        },

        realizaConta(){
            let conta = this.display.value;

            try{
                conta = eval(conta);

                if(!conta){
                    alert('Conta Inválida!');
                    return;
                }

                this.display.value = conta;
            } catch(e){
                alert('Conta Inválida!');
                return;
            }
        },



        cliqueBotoes(){
            //se fizer uso de uma arrow function para a função anonima que passa o evento, não precisá do comando .bind(this) "linha 27" para forçar a qual this se refere.
            //document.addEventListener('click', (event) => {
            document.addEventListener('click', function(event){
                const elemento = event.target;//pegamos qual parte do documento está sendo clicado.

                if (elemento.classList.contains('btn-number')){
                    this.insereBtnDisplay(elemento.innerText);
                }

                if (elemento.classList.contains('btn-clear')){
                    this.clearDisplay();
                }

                if (elemento.classList.contains('btn-delete')){
                    this.deleteLastCharacter();
                }

                if (elemento.classList.contains('btn-equal')){
                    this.realizaConta();
                }

            }.bind(this)); //Com este comando, dizemos a função que queremos utilizar o this anterior (calculadora) e não o this desta função (document).
        },


        insereBtnDisplay(valor){//recebemos o innertext do botão no HTML e concatenamos no display este mesmo valor.
            this.display.value += valor;
            this.display.focus(); //evita que, ao pressionar enter multiplas vezes, repita a ultima tecla pressionada.
        }


    };
}

const calculadora = criaCalculadora();
calculadora.inicia();
*/

function Calculadora(){
    this.display = document.querySelector('.display');

    //arrow function para iniciar a calculadora1
    this.inicia = () => {
        this.cliqueBotoes();
        this.pressionaEnter();
    };

    this.pressionaEnter = () => {
        this.display.addEventListener('keyup', (e) => {
            if (e.keyCode === 13){
                this.realizaConta();
            }
        });
    };

    this.clearDisplay = () => {
        this.display.value = '';
    };

    this.deleteLastCharacter = () => {
        this.display.value = this.display.value.slice(0, -1);//receberá o tamanho da string -1, menos o ultimo caractere inserido.
    };

    this.realizaConta = () => {
        let conta = this.display.value;

        try{
            conta = eval(conta);
            if(!conta){
                alert('Conta Inválida!');
                return;
            }

            this.display.value = conta;
        } catch(e){
            alert('Conta Inválida!');
            return;
        }
    };

    this.cliqueBotoes = () => {
        //se fizer uso de uma arrow function para a função anonima que passa o evento, não precisá do comando .bind(this) "linha 27" para forçar a qual this se refere.
        //document.addEventListener('click', (event) => {
        document.addEventListener('click', function(event){
            const elemento = event.target;//pegamos qual parte do documento está sendo clicado.

            if (elemento.classList.contains('btn-number')){
                this.insereBtnDisplay(elemento.innerText);
            }

            if (elemento.classList.contains('btn-clear')){
                this.clearDisplay();
            }

            if (elemento.classList.contains('btn-delete')){
                this.deleteLastCharacter();
            }

            if (elemento.classList.contains('btn-equal')){
                this.realizaConta();
            }

        }.bind(this)); //Com este comando, dizemos a função que queremos utilizar o this anterior (calculadora) e não o this desta função (document).
    };

    this.insereBtnDisplay = (valor) => {//recebemos o innertext do botão no HTML e concatenamos no display este mesmo valor.
        this.display.value += valor;
        this.display.focus(); //evita que, ao pressionar enter multiplas vezes, repita a ultima tecla pressionada.
    };

}

const calculadora = new Calculadora();
calculadora.inicia();