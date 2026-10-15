package uceva.cleanarchitecture.infrastructure.repository;

import uceva.cleanarchitecture.domain.entity.Product;
import uceva.cleanarchitecture.domain.repository.ProductRepository;
import uceva.cleanarchitecture.infrastructure.datasource.ProductDatasource;

import java.util.List;

public class ProductRepositoryImpl extends ProductRepository {

    private final ProductDatasource productDatasource;

    public ProductRepositoryImpl(ProductDatasource productDatasource){
        this.productDatasource = productDatasource;
    }

    @Override
    public List<Product> getAll(int countProducts) {
        return productDatasource.getAll(countProducts);
    }
}
