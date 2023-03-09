const { async } = require('regenerator-runtime');
const Login = require('../models/LoginModel')

exports.index = (requisicao, resposta) => {
    if(requisicao.session.user) return resposta.render('login-logado')
    return resposta.render('login');
};

exports.register = async function(requisicao, resposta){
    try{
        const login = new Login(requisicao.body); //envia para a classe uma requisição do body.
    await login.register(); //como o método register retorn auma promisse, essa função precisa ser async com a chamada await.

    if(login.errors.length > 0) {
        requisicao.flash('errors', login.errors);
        requisicao.session.save(function() {
            return resposta.redirect('/login/index');
        });
        return;
    }
    requisicao.flash('success', 'Usuário cadastrado com sucesso!');
    requisicao.session.save(function() {
        return resposta.redirect('/login/index');//exibe os dados que são enviados para a classe.
    });
    } catch(e){
        console.log(e);
        return resposta.render('404');
    }
}

exports.enter = async function(requisicao, resposta){
    try{
        const login = new Login(requisicao.body);
    await login.logar();
    
    //caso possua algum erro 
    if(login.errors.length > 0) {
        requisicao.flash('errors', login.errors);
        requisicao.session.save(function() {
            return resposta.redirect('/login/index');
        });
        return;
    }

    requisicao.flash('success', 'Sucesso ao efetuar login!');
    requisicao.session.user = login.user;

    requisicao.session.save(function() {
        return resposta.redirect('/login/index');//exibe os dados que são enviados para a classe.
    });
    } catch(e){
        console.log(e);
        return resposta.render('404');
    }
}

exports.logout = function(requisicao, resposta){
    requisicao.session.destroy(); //destroi a sessão quando deslogar o usuário.
    resposta.redirect('/'); //manda para a home.
}