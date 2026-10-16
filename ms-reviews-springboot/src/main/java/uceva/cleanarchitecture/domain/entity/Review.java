package uceva.cleanarchitecture.domain.entity;

public class Review {
    public Integer id;
    public String title;
    public Integer rating;
    public String comment;

    public Review(Integer id, String title, Integer rating, String comment) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.comment = comment;
    }
}
