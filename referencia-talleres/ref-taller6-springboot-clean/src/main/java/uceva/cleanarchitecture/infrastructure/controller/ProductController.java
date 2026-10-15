package uceva.cleanarchitecture.infrastructure.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uceva.cleanarchitecture.application.usecase.GetAllProductsUseCase;
import uceva.cleanarchitecture.domain.entity.Product;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final GetAllProductsUseCase getAllProductsUseCase;

    public ProductController(GetAllProductsUseCase getAllProductsUseCase){
        this.getAllProductsUseCase = getAllProductsUseCase;
    }

    @GetMapping("/{countProducts}")
    public List<Product> getAll(@PathVariable int countProducts) {
        return getAllProductsUseCase.execute(countProducts);
    }

}
