import prismaClient from "../../prisma";

interface FinishOrderRequest {
    orderId: string;
}

class FinishOrderService {
    async execute({ orderId }: FinishOrderRequest) {
        await prismaClient.order.update({
            where: {
                id: orderId
            },
            data: {
                status: true
            }
        });
    }
}

export { FinishOrderService };