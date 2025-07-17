//router
import { Router } from 'express';
import guitarController from '../controllers/guitar.controller.js';
import { authentication } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/:id', guitarController.getGuitarById);
router.get('/', guitarController.getGuitars);
router.post('/', authentication, guitarController.createGuitar);
router.put('/:id', authentication, guitarController.updateGuitar);
router.delete('/:id', authentication, guitarController.deleteGuitar);




export default router;
