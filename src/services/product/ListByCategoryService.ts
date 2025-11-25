import prismaClient from "../../prisma";

interface ListByCategoryRequest {
    category_id: string;
}

class ListByCategoryService {
    async execute({ category_id }: ListByCategoryRequest) {

        if (!category_id) {
            throw new Error("category_id is required");
        }

        const products = await prismaClient.product.findMany({
            where: {
                categoryId: category_id
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                categoryId: true
            }
        });

        return products;
    }
}

export { ListByCategoryService };