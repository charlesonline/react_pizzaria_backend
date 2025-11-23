import {Router,Request,Response} from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Pizzaria API!' });
});

router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

router.post('/categories', isAuthenticated, new CreateCategoryController().handle);

export { router };