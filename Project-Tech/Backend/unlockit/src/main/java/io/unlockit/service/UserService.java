package io.unlockit.service;

import io.unlockit.model.mongodb.User;

import java.util.List;

public interface UserService {

    User handleLogin(String userId, String email);
    User saveUser(User user);
    List<User> getAllUsers();
    User getUserByEmail(String email);
    User getUserById(String userId);
    User updateUser(User user, String userId);
    User updateUserByEmail(User user, String email);
    void deleteUser(String userId);
    User getUser(String s);
}
