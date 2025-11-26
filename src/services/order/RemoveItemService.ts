import prismaClient from "../../prisma";

interface RemoveItemRequest {
    item_id: string;
}

class RemoveItemService {
    async execute({ item_id }: RemoveItemRequest) {

        if (!item_id) {
            throw new Error("Item ID is required");
        }

        const item = await prismaClient.orderItem.findUnique({
            where: {
                id: item_id
            }
        });

        if (!item) {
            throw new Error("Item not found");
        }

        // Remove the item
        await prismaClient.orderItem.delete({
            where: {
                id: item_id
            }
        });

        return { message: "Item removed successfully" };
    }
}

export { RemoveItemService };