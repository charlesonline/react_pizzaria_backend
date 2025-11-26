import {Request,Response} from 'express';
import { DetailsOrderService } from '../../services/order/DetailsOrderService';

class DetailsOrderController {
    async handle(req:Request,res:Response){
        const orderId = req.query.orderId as string;

        const detailsOrderService = new DetailsOrderService();

        const orders = await detailsOrderService.execute({
            orderId
        });

        return res.json(orders);
    }
}

export { DetailsOrderController }