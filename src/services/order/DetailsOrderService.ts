import prismaClient from "../../prisma";

interface DetailsRequest {
    orderId: string;
}

class DetailsOrderService {
    async execute({ orderId }: DetailsRequest) {
        const orders = await prismaClient.orderItem.findMany({
            where: {
                orderId: orderId
            },
            include: {
                product: true,
                order: true
            }
        });

        return orders;
    }
}

export { DetailsOrderService };