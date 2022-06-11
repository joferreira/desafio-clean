import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUsecase from "./update.product.usecase";

const product = ProductFactory.create("Product 1", 100);

const input = {
    id: product.id,
    name: "Product 1 Updated",
    price: 200
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test product update use case" , () => {

    it("should update product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUsecase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});