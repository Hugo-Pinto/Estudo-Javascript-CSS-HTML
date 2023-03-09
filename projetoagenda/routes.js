const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware');

//rotas da home
route.get('/', homeController.index);

//rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register); //post pois, o método no formulário é POST.
route.post('/login/enter', loginController.enter); 
route.get('/login/logout', loginController.logout); 

//rotas de contato
route.get('/contato/index', loginRequired, contatoController.index); //se o usuário não estiver logado, vai barrar o acesso pois o middleware executa antes do controller.
route.post('/contato/register', contatoController.register); //post pois, o método no formulário é POST.
route.get('/contato/index/:id', loginRequired, contatoController.editIndex); //se o usuário não estiver logado, vai barrar o acesso pois o middleware executa antes do controller.
route.post('/contato/edit/:id', loginRequired, contatoController.edit); 
route.get('/contato/delete/:id', loginRequired, contatoController.delete); 


module.exports = route;