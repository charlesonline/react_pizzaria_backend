import prismaClient from "../../prisma";

interface OrderRequest {
    table: string;
    name?: string;
}

class CreateOrderService {
    async execute({ table, name }: OrderRequest) {

        if (!table) {
            throw new Error("Table number is required");
        }

        const order = await prismaClient.order.create({
            data: {
                table: table,
                name: name
            },
            select: {
                id: true,
                table: true,
                status: true,
                draft: true,
                createdAt: true
            }
        });

        return order;
    }
}

export { CreateOrderService };