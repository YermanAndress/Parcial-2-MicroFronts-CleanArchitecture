package uceva.cleanarchitecture.infrastructure.repository;

import uceva.cleanarchitecture.domain.entity.User;
import uceva.cleanarchitecture.domain.repository.UserRepository;
import uceva.cleanarchitecture.infrastructure.datasource.UserDatasource;

import java.util.List;

public class UserRepositoryImpl extends UserRepository {

    private final UserDatasource userDatasource;

    public UserRepositoryImpl(UserDatasource userDatasource){
        this.userDatasource = userDatasource;
    }

    @Override
    public List<User> getAll(int countUsers) {
        return userDatasource.getAll(countUsers);
    }
}
