package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Product;
import uceva.cleanarchitecture.domain.repository.ProductRepository;

import java.util.List;

public class GetAllProductsUseCase {
    private final ProductRepository productRepository;

    public GetAllProductsUseCase(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public List<Product> execute(int countProducts){
        return productRepository.getAll(countProducts);
    }
}
