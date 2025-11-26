import {Request,Response} from 'express';
import { FinishOrderService } from '../../services/order/FinishOrderService';

class FinishOrderController {
    async handle(req:Request,res:Response){
        const { orderId } = req.body;

        const finishOrderService = new FinishOrderService();

        await finishOrderService.execute({
            orderId
        });

        return res.status(200).json({ message: "Order finished successfully." });
    }
}

export { FinishOrderController };