import { Router } from 'express'; // importando somente o router do express.
import loginRequired from '../middlewares/loginRequired';
import pictureController from '../controllers/PictureController';

const router = new Router();

router.post('/', loginRequired, pictureController.store);

export default router;
