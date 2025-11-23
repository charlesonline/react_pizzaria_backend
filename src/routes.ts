import {Router,Request,Response} from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Pizzaria API!' });
});

router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

export { router };