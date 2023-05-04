"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); // importando somente o router do express.
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// rotas que não deveriam existir
// router.get('/', UserController.index);
// router.get('/:id', UserController.show); // quando a rota receber parametros, utilize dois pontos.

router.post('/', _loginRequired2.default, _UserController2.default.store); // pode ser tanto creat ou store.
router.put('/', _loginRequired2.default, _UserController2.default.update);
router.delete('/', _loginRequired2.default, _UserController2.default.delete); // verificamos o token do login para atualizar dados do usuário

exports. default = router;

/*
Podemos ter em cada controller até 5 métodos.

index -> lista todos os usuários -> geralmente é GET
store/create -> cria um novo usuário -> geralmente é POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> utiliza um usuário -> PATCH ou PUT

patch -> quando se altera apenas um valor.
put -> quando você pega um objeto inteiro e substitui por um novo objeto inteiro.
*/
