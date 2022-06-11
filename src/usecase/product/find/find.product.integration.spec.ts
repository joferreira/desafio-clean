import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import FindProductUsecase from "./find.product.usecase";

describe("Test find product use case", () => {

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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUsecase(productRepository);

        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const input = { id: "1" };

        const output = {
            id: "1",
            name: "Product 1",
            price: 100
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);

    });
})