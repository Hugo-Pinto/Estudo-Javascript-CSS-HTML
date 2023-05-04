import { Router } from 'express'; // importando somente o router do express.
import homeController from '../controllers/HomeController';

const router = new Router();

router.get('/', homeController.index);

export default router;
