import CreateProductUsecase from "./create.product.usecase";

const product = {
    name: "Product 1",
    price: 200
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test create product use case" , () => {

    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUsecase(productRepository);

        const output = await productCreateUseCase.execute(product);

        expect(output).toEqual({
            id: expect.any(String),
            name: product.name,
            price: product.price,
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUsecase(productRepository);

        product.name = "";

        await expect(productCreateUseCase.execute(product)).rejects.toThrow("Name is required");

    })

    it("should throw an error when price is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUsecase(productRepository);

        product.name = "Product 1";
        product.price = 0;

        await expect(productCreateUseCase.execute(product)).rejects.toThrow("Price must be greater than 0");

    })

})