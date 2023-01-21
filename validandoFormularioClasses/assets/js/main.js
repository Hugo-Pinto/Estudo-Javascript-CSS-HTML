class ValidaFormulario{
    //nome, sobrenome, cpf, senha, repetirSenha
    constructor(){
        this.formulario = document.querySelector('.formulario'); //capturando o formulário.
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e => { //usamos uma arrow function para capturar o evento pois ela não permite a alteração do this.
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
        e.preventDefault(); //impede que o formulário seja enviado.
        const valido = this.isValid();
        const senhaValida = this.ValidPassword(); //flag valid vai retornar true ou false para valido e senha valida.

        if(valido && senhaValida){
            alert('Formulário Enviado!');
            this.formulario.submit();
        }
    }

    isValid(){
        let valid = true;
        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove(); //removemos todos os erros no formulário assim que for reenviado novamente.
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){ //validando cada campo do formulário.
            const label = campo.previousElementSibling.innerText; //pegamos o inner text ou inner html do elemento anterior que é irmão deste campo.
            if(!campo.value) { //se a string estiver vazia.
                this.creatError(campo, `campo "${label}" não pode estar vazio`);
                valid = false;
            }
            if(campo.classList.contains('cpf')){ 
                if(!this.validaCPF(campo)) valid = false;//chama a função de validação do CPF para verificar se o CPF existe
            }

            if(campo.classList.contains('usuario')){ //sempre o nome da classe
                if(!this.validaUsuario(campo)) valid = false;
            }
        }
        return valid;
    }
    validaUsuario(campo){
        const Usuario = campo.value;   
        let valid = true; //essa flag valid não tem nada a ver com a da função isvalid
        if(Usuario.length < 3 || Usuario.length > 12){
            this.creatError(campo, 'Usuário precisa ter entre 3 e 12 caracteres!');
            valid = false;
        }
        if(!Usuario.match(/^[a-zA-Z0-9]+$/g)){//utilizando expressões regulares para verificar se o usuário possui letras ou números no nome, se for diferente gera erro
            this.creatError(campo, 'Usuário precisa conter apenas letras e/ou números!');
            valid = false;
        }
        return true;
    }

    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value); //passamos o valor que está no formulário para a função verificadora do CPF

        if(!cpf.valida()) {
            this.creatError(campo, 'CPF inválido!');
            return false;
        }
        return true;
    }

    creatError(campo, mensagem){
        const div = document.createElement('div'); //criamos uma div no documento HTML
        div.innerHTML = mensagem; //a div receberá a mensagem de error
        div.classList.add('error-text');//inserimos uma classe na div para estilizar posteriormente.
        campo.insertAdjacentElement('afterend', div); //inserimos a informação abaixo do formulário que está com erro.
    }

    ValidPassword(){
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const senhaRepetida = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== senhaRepetida.value){
            valid = false;
            this.creatError(senha, 'campos senha e repetir senha devem ser iguais!');
            this.creatError(senhaRepetida, 'campos senha e repetir senha devem ser iguais!');
        }

        if(senha.value.length < 3 || senha.value.length > 12){
            valid = false;
            this.creatError(senha, 'A senha precisa ter entre 3 a 12 caracteres!');
        }

        return valid;
    }
}

const valida = new ValidaFormulario(); 