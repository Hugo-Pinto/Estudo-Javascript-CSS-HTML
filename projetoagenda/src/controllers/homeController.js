const Contato = require("../models/ContatoModel")

exports.index = async (requisicao, resposta) => {
    const contatos = await Contato.buscaContatos(); //recebe todos os contatos do usuário em ordem decrescente.
    resposta.render('index', { contatos }); //passamos um objeto e injetamos os contatos diretamente no index.ejs
};

