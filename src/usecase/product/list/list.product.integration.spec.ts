import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import ListProductUsecase from "./list.product.usecase";

describe("Unit test for list product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should list a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUsecase(productRepository);

        const product1 = new Product("1", "Product 1", 100);
        const product2 = new Product("12", "Product 2", 200);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const productsResult = await productRepository.findAll();

        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(productsResult[0].id);
        expect(output.products[0].name).toBe(productsResult[0].name);
        expect(output.products[0].price).toBe(productsResult[0].price);
        expect(output.products[1].id).toBe(productsResult[1].id);
        expect(output.products[1].name).toBe(productsResult[1].name);
        expect(output.products[1].price).toBe(productsResult[1].price);

    });
    
});