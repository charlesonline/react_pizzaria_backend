import prismaClient from "../../prisma";

interface RemoveOrderRequest {
    order_id: string;
}

class RemoveOrderService {
    async execute({ order_id }: RemoveOrderRequest) {

        if (!order_id) {
            throw new Error("Order ID is required");
        }

        const order = await prismaClient.order.findUnique({
            where: {
                id: order_id
            }
        });

        if (!order) {
            throw new Error("Order not found");
        }

        // Remove the order
        await prismaClient.order.delete({
            where: {
                id: order_id
            }
        });

        return { message: "Order removed successfully" };
    }
}

export { RemoveOrderService };