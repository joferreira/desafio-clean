import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUsecase {
    private ProductRepository: ProductRepositoryInterface;
    constructor(ProductRepository: ProductRepositoryInterface) {
        this.ProductRepository = ProductRepository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.ProductRepository.findAll();

        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(products: Product[]): OutputListProductDto {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            }))
        };
    }
}