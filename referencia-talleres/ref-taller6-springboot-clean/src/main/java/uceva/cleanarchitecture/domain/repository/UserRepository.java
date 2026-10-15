package uceva.cleanarchitecture.domain.repository;

import uceva.cleanarchitecture.domain.entity.User;

import java.util.List;

public abstract class UserRepository {
    public abstract List<User> getAll(int countUsers);
}
