package uceva.cleanarchitecture.domain.entity;

public class Product {
    public Integer id;
    public String name;
    public String category;
    public Float price;

    public Product(Integer id, String name, String category, Float price) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
    }
}
