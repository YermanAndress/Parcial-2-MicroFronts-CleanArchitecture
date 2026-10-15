package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.User;
import uceva.cleanarchitecture.domain.repository.UserRepository;

import java.util.List;

public class GetAllUsersUseCase {

    private final UserRepository userRepository;

    public GetAllUsersUseCase(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<User> execute(int countUsers){
        return userRepository.getAll(countUsers);
    }

}
