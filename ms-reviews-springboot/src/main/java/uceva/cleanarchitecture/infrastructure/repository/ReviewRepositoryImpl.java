package uceva.cleanarchitecture.infrastructure.repository;

import uceva.cleanarchitecture.domain.entity.Review;
import uceva.cleanarchitecture.domain.repository.ReviewRepository;
import uceva.cleanarchitecture.infrastructure.datasource.ReviewDatasource;

import java.util.List;

public class ReviewRepositoryImpl extends ReviewRepository {

    private final ReviewDatasource reviewDatasource;

    public ReviewRepositoryImpl(ReviewDatasource reviewDatasource) {
        this.reviewDatasource = reviewDatasource;
    }

    @Override
    public List<Review> getAll(int count) {
        return reviewDatasource.getAll(count);
    }

    @Override
    public Review getById(int id) {
        return reviewDatasource.getById(id);
    }

    @Override
    public Review create(Review review) {
        return reviewDatasource.create(review);
    }
}
