import {Router,Request,Response} from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';

import uploadConfig from './config/multer';
import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();
const upload = multer(uploadConfig.upload('1/img/products'));

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Pizzaria API!' });
});

router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

router.post('/categories', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoryController().handle);

router.post('/products', isAuthenticated, upload.single('file'), new CreateProductController().handle);

export { router };