package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Review;
import uceva.cleanarchitecture.domain.repository.ReviewRepository;

public class CreateReviewUseCase {

    private final ReviewRepository reviewRepository;

    public CreateReviewUseCase(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review execute(Review review) {
        return reviewRepository.create(review);
    }
}
