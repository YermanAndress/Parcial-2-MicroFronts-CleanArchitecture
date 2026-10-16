package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Review;
import uceva.cleanarchitecture.domain.repository.ReviewRepository;

import java.util.List;

public class GetAllReviewsUseCase {

    private final ReviewRepository reviewRepository;

    public GetAllReviewsUseCase(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> execute(int count) {
        return reviewRepository.getAll(count);
    }
}
