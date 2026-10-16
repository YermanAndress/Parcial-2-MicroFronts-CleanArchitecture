package uceva.cleanarchitecture.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import uceva.cleanarchitecture.application.usecase.CreateReviewUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllReviewsUseCase;
import uceva.cleanarchitecture.application.usecase.GetReviewByIdUseCase;
import uceva.cleanarchitecture.domain.repository.ReviewRepository;
import uceva.cleanarchitecture.infrastructure.datasource.ReviewDatasource;
import uceva.cleanarchitecture.infrastructure.repository.ReviewRepositoryImpl;

@Configuration
public class AppConfig {

    @Bean
    ReviewDatasource reviewDatasource() {
        return new ReviewDatasource();
    }

    @Bean
    ReviewRepository reviewRepository(ReviewDatasource reviewDatasource) {
        return new ReviewRepositoryImpl(reviewDatasource);
    }

    @Bean
    GetAllReviewsUseCase getAllReviewsUseCase(ReviewRepository reviewRepository) {
        return new GetAllReviewsUseCase(reviewRepository);
    }

    @Bean
    GetReviewByIdUseCase getReviewByIdUseCase(ReviewRepository reviewRepository) {
        return new GetReviewByIdUseCase(reviewRepository);
    }

    @Bean
    CreateReviewUseCase createReviewUseCase(ReviewRepository reviewRepository) {
        return new CreateReviewUseCase(reviewRepository);
    }
}
