package maroon.auth.service;

import maroon.auth.base.User;

public interface UserService {
    void saveUser(User user);

    User findByUsername(String username);
}