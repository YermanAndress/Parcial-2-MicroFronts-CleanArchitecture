package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Review;
import uceva.cleanarchitecture.domain.repository.ReviewRepository;

public class GetReviewByIdUseCase {

    private final ReviewRepository reviewRepository;

    public GetReviewByIdUseCase(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review execute(int id) {
        return reviewRepository.getById(id);
    }
}
