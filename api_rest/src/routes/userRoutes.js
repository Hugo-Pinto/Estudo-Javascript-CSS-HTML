import { Router } from 'express'; // importando somente o router do express.
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// rotas que não deveriam existir
// router.get('/', UserController.index);
// router.get('/:id', UserController.show); // quando a rota receber parametros, utilize dois pontos.

router.post('/', loginRequired, UserController.store); // pode ser tanto creat ou store.
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete); // verificamos o token do login para atualizar dados do usuário

export default router;

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
