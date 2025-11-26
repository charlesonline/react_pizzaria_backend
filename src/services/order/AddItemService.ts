import prismaClient from "../../prisma";

interface AddItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService {
    async execute({ order_id, product_id, amount }: AddItemRequest) {

        if (!order_id && !product_id) {
            throw new Error("Order ID and Product ID are required");
        }

        const order = await prismaClient.order.findUnique({
            where: {
                id: order_id
            }
        });

        if (!order) {
            throw new Error("Order not found");
        }

        const product = await prismaClient.product.findUnique({
            where: {
                id: product_id
            }
        });

        if (!product) {
            throw new Error("Product not found");
        }

        const orderItem = await prismaClient.orderItem.create({
            data: {
                orderId: order_id,
                productId: product_id,
                amount: amount
            }
        });

        return orderItem;
    }
}

export { AddItemService };