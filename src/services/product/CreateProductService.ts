import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {
    async execute({ name, price, description, banner, category_id }: ProductRequest) {

        // if (!name || !price || !categoryId) {
        //     throw new Error("name, price and category are required");
        // }

        const productAlreadyExists = await prismaClient.product.findFirst({ where: { name } });

        if (productAlreadyExists) {
            throw new Error("Product already exists");
        }

        const product = await prismaClient.product.create({
            data: {
                name,
                price,
                description,
                banner,
                categoryId: category_id
            },select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                categoryId: true
            }
        });

        return product;
    }
}

export { CreateProductService };