exports.middlewareGlobal = (requisicao, resposta, next ) => {
    resposta.locals.errors = requisicao.flash('errors');
    resposta.locals.success = requisicao.flash('success');
    resposta.locals.user = requisicao.session.user;
    next();
};

exports.checkCsrfError = (error, requisicao, resposta, next) => {
    if (error){
        return resposta.render('404');
    }
    next();
}

exports.csrfMiddleware = (requisicao, resposta, next) => {
    resposta.locals.csrfToken = requisicao.csrfToken();
    next();
}

exports.loginRequired = (requisicao, resposta, next) => {
    //verifica se o usuário está logado.
    if(!requisicao.session.user){
        requisicao.flash('errors', 'Você precisa estar logado para realizar alterações na Agenda!');
        requisicao.session.save( () => resposta.redirect('/')); //redirecionamos para a HOME do site caso não esteja logado.
        return;
    }
    next(); //caso esteja tudo certo, passa pro próximo middleware.
}

