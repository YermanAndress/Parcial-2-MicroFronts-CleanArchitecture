package uceva.cleanarchitecture.infrastructure.datasource;

import com.github.javafaker.Faker;
import uceva.cleanarchitecture.domain.entity.Review;

import java.util.ArrayList;
import java.util.List;

public class ReviewDatasource {

    private final Faker faker = new Faker();

    public List<Review> getAll(int count) {
        List<Review> reviews = new ArrayList<>();
        for (int i = 1; i <= count; i++) {
            reviews.add(generateReview(i));
        }
        return reviews;
    }

    public Review getById(int id) {
        return new Review(id, "Excelente película", 5, "Obra maestra, totalmente recomendada");
    }

    public Review create(Review review) {
        return new Review(Math.abs((int) System.currentTimeMillis() % 1000000), review.title, review.rating, review.comment);
    }

    private Review generateReview(Integer id) {
        return new Review(
                id,
                faker.lorem().sentence(3).replace(".", ""),
                faker.number().numberBetween(1, 5),
                faker.lorem().sentence(8)
        );
    }
}
