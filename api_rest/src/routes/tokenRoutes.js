import { Router } from 'express'; // importando somente o router do express.
import tokenController from '../controllers/TokenController';

const router = new Router();

router.post('/', tokenController.store);

export default router;
