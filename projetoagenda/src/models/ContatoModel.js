const mongoose = require('mongoose');
const validator = require('validator');


const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function() {
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body); //this.contato recebe os dados que serão inseridos na base de dados, por isso a função async await.
};

Contato.prototype.valida = function() {
    this.cleanUp();
    //verificando se o email é valido
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido'); //verifica se o email existe, caso contrário rejeita.
    if (!this.body.nome) this.errors.push('O contato precisa de um Nome');
    if (!this.body.email && !this.body.telefone) {
        this.errors.push('Ao menos um dos dados precisa ser enviado: e-mail ou telefone');
    }
};

Contato.prototype.cleanUp = function() {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = ''; //cada campo enviado pelo formulário, no caso _csrf, email e senha, receberá uma string vazio.
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    };
};

Contato.prototype.edit = async function(id){
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
};

//metodos estáticos, São estáticos pois não utilizam o this como referencia.

Contato.buscaPorId = async function(id){
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id);
    return contato;
};

Contato.buscaContatos = async function(){
    const contatos = await ContatoModel.find() //pega todos os contatos na base de dados.
    .sort({criadoEm: -1}); //listará os contatos ordenados em ordem decrescente a partir da data de criação.
    return contatos; //retorno todos os contatos da base de dados do usuário logado ordenados decrescentemente.
};

Contato.delete = async function(id){
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id: id}) //Deleta o contato da base de dados
    return contato; 
};

module.exports = Contato;