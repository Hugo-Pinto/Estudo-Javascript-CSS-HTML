const mongoose = require('mongoose');
const validator = require('validator');

//campos do banco de dados.
const loginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const bcryptjs = require('bcryptjs');
const { async } = require('regenerator-runtime');

const loginModel = mongoose.model('Login', loginSchema); //constante responsável pelo banco.

class Login {
    constructor(body) {
        this.body = body;
        this.errors = []; //caso tenha algum erro dentro do array, não criamos um novo usuário.
        this.user = null;
    }

    //como faremos login em uma base de dados, trabalhamos com promisses, portanto, os métodos devem ser async
    async register() {
        this.valida();
        if (this.errors.length > 0) return;

        //verifica se o email já está cadastrado.
        await this.userExists();
        //caso tenha um usuário cadastrado, geramos o erro.
        if (this.errors.length > 0) return;

        //criptografando a senha do usuário.
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await loginModel.create(this.body);

    }

    async userExists() {
        //passamos um objeto ao método findOne que verificará se existe um email igual já cadastrado na base de dados. Retorna o usuário ou NULL.
        this.user = await loginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('O usuário que está tentando cadastrar já existe!');
    }

    valida() {
        this.cleanUp();
        //verificando se o email é valido
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido'); //adcionamos uma string de error ao vetor de erros.

        if (this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('A senha precisa ter entre 3 a 50 caracteres.');
    }

    //método responsável por garantir que a requisicao.body enviada pelo formulário é de fato uma string.
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''; //cada campo enviado pelo formulário, no caso _csrf, email e senha, receberá uma string vazio.
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

    async logar() {
        this.valida();
        if (this.errors.length > 0) return;

        //verifica se o usuário está cadastrado na base de dados.
        this.user = await loginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Usuário não cadastrado!');
            return;
        }

        //verifica se a senha enviada e a senha que está no banco são iguais.
        if (!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida!');
            this.user = null;
        }
    }
}

module.exports = Login;