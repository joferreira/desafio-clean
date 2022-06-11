import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import UpdateProductUsecase from "./update.product.usecase";

describe("Test update product use case", () => {

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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const productUpdateUseCase = new UpdateProductUsecase(productRepository);
        
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productResult = await productRepository.find(product.id);

        const input = {
            id: productResult.id ,
            name: "Product 2",
            price: 200
        };        

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);


    });

});