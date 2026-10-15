package uceva.cleanarchitecture.infrastructure.datasource;

import com.github.javafaker.Faker;
import uceva.cleanarchitecture.domain.entity.Product;
import uceva.cleanarchitecture.domain.entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


public class ProductDatasource {

    private Faker faker = new Faker();
    private final Random random = new Random();
    private final String[] categories = {
            "Lacteos",
            "Carnes",
            "Frutas",
            "Verduras",
    };

    public List<Product> getAll(int countProducts){
        List<Product> products = new ArrayList<Product>();
        for (int i = 1; i <= countProducts; i++) {
            products.add(generateProduct(i));
        }
        return products;
    }

    private Product generateProduct(Integer id){
        return new Product(
                id,
                faker.commerce().productName(),
                randomCategory(),
                (float) faker.number().numberBetween(0, 1000)
        );
    }

    private String randomCategory() {
        return categories[random.nextInt(categories.length)];
    }

}
