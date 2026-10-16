package uceva.cleanarchitecture.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uceva.cleanarchitecture.application.usecase.CreateReviewUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllReviewsUseCase;
import uceva.cleanarchitecture.application.usecase.GetReviewByIdUseCase;
import uceva.cleanarchitecture.domain.entity.Review;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@Tag(name = "Reviews")
public class ReviewController {

    private final GetAllReviewsUseCase getAllReviewsUseCase;
    private final GetReviewByIdUseCase getReviewByIdUseCase;
    private final CreateReviewUseCase createReviewUseCase;

    public ReviewController(GetAllReviewsUseCase getAllReviewsUseCase,
                            GetReviewByIdUseCase getReviewByIdUseCase,
                            CreateReviewUseCase createReviewUseCase) {
        this.getAllReviewsUseCase = getAllReviewsUseCase;
        this.getReviewByIdUseCase = getReviewByIdUseCase;
        this.createReviewUseCase = createReviewUseCase;
    }

    @GetMapping("/{count}")
    @Operation(summary = "Obtener listado de reviews")
    public List<Review> getAll(@PathVariable int count) {
        return getAllReviewsUseCase.execute(count);
    }

    @GetMapping("/item/{id}")
    @Operation(summary = "Obtener review por id")
    public Review getById(@PathVariable int id) {
        return getReviewByIdUseCase.execute(id);
    }

    @PostMapping
    @Operation(summary = "Crear review")
    public Review create(@RequestBody Review review) {
        return createReviewUseCase.execute(review);
    }
}
