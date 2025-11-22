import {Router,Request,Response} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
    // throw new Error("This is a test error");
});

export { router };