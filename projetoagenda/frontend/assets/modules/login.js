export default class login{
    constructor(formClass){
        this.form = document.querySelector('formClass');
    }

    init(){ 
        this.events();
    }

    events(){
        if(!this.form) return; //caso não tenha sido enviado um formulário válido, retorna
        this.form.addEventListener('submit', (e) => {
            e.preventDefault(); //impede o comportamento padrão do formulário.
            this.validate(e);
        });
    }

    validate(e){
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');

        console.log(emailInput.value, passwordInput.value);
    }
}