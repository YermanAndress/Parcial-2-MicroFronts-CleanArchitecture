package uceva.cleanarchitecture.infrastructure.datasource;

import com.github.javafaker.Faker;
import uceva.cleanarchitecture.domain.entity.User;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class UserDatasource {

    private Faker faker = new Faker();
    private final Random random = new Random();
    private final String[] engineerings = {
            "Sistemas",
            "Electronica",
            "Biomedica",
            "Industrial",
            "Ambiental"
    };

    public List<User> getAll(int countUsers){
        List<User> users = new ArrayList<User>();
        for (int i = 1; i <= countUsers; i++) {
            users.add(generateUser(i));
        }
        return users;
    }

    private User generateUser(Integer id){
        return new User(
                id,
                faker.name().firstName(),
                faker.name().lastName(),
                faker.number().numberBetween(18, 35),
                faker.internet().emailAddress(),
                randomEngineering()
        );
    }

    private String randomEngineering() {
        return engineerings[random.nextInt(engineerings.length)];
    }
    
}