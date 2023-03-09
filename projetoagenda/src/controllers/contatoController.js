const Contato = require('../models/ContatoModel');

exports.index = function (requisicao, resposta) {
    resposta.render('contato', {
        contato: {}
    });
}

exports.register = async function (requisicao, resposta) {
    try {
        const contato = new Contato(requisicao.body);

        await contato.register();

        if (contato.errors.length > 0) {
            requisicao.flash('errors', contato.errors);
            requisicao.session.save(() => resposta.redirect('/contato/index')); //redirecionamos para a HOME do site caso não esteja logado.
            return;
        }

        requisicao.flash('success', 'Contato registrado com sucesso!');
        requisicao.session.save(() => resposta.redirect(`/contato/index/${contato.contato._id}`)); //redirecionamos para a HOME do site caso não esteja logado.
        return;
    }
    catch (e) {
        console.log(e);
        return resposta.render('404');
    }
}

exports.editIndex = async function (requisicao, resposta) {
    if (!requisicao.params.id) return resposta.render('404');

    const contato = await Contato.buscaPorId(requisicao.params.id);

    if (!contato) return resposta.render('404');
    resposta.render('contato', {
        contato: contato,
    });
};

exports.edit = async function (requisicao, resposta) {
    try {
        if (!requisicao.params.id) return resposta.render('404');

        const contato = new Contato(requisicao.body);
        await contato.edit(requisicao.params.id);

        if (contato.errors.length > 0) {
            requisicao.flash('errors', contato.errors);
            requisicao.session.save(() => resposta.redirect('/contato/index')); //redirecionamos para a HOME do site caso não esteja logado.
            return;
        }

        requisicao.flash('success', 'Contato Editado com Sucesso!');
        requisicao.session.save(() => resposta.redirect(`/contato/index/${contato.contato._id}`));
        return;
    }
    catch (e) {
        console.log(e);
        resposta.render('404');
    }
};

exports.delete = async function (requisicao, resposta){
    if (!requisicao.params.id) return resposta.render('404');

    const contato = await Contato.delete(requisicao.params.id);

    if (!contato) return resposta.render('404');
    
    requisicao.flash('success', 'Contato Excluído com Sucesso!');
        requisicao.session.save(() => resposta.redirect(`/`));
        return;
};