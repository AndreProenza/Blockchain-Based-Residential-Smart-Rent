package io.unlockit.service.impl;

import io.unlockit.exception.ResourceNotFoundException;
import io.unlockit.model.mongodb.User;
import io.unlockit.repository.UserRepository;
import io.unlockit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User handleLogin(String userId, String email) {
        Optional<User> existingUser = userRepository.findById(userId);
        if(!existingUser.isPresent()) {
            int phone = 0, taxId = 0;
            User user = new User(userId, email, phone, taxId);
            return userRepository.save(user);
        }
        return existingUser.get();
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
            return user.get();
        }
        throw new ResourceNotFoundException("User", "Email", email);
    }

    @Override
    public User getUserById(String userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            return user.get();
        }
        throw new ResourceNotFoundException("User", "ID", userId);
    }

    @Override
    public User updateUser(User user, String userId) {
        User existingUser = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "ID", userId));
        existingUser.setEmail(user.getEmail());
        updateUser(existingUser, user);
        //Save in Database
        userRepository.save(existingUser);
        return existingUser;
    }

    @Override
    public User updateUserByEmail(User user, String email) {
        User existingUser = userRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("User", "Email", email));
        updateUser(existingUser, user);
        //Save in Database
        userRepository.save(existingUser);
        return existingUser;
    }

    private void updateUser(User existingUser, User user) {
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setPhone(user.getPhone());
        existingUser.setTaxID(user.getTaxID());
        existingUser.setAddress(user.getAddress());
        existingUser.setCountry(user.getCountry());
        existingUser.setCity(user.getCity());
        existingUser.setAdvertises(user.getAdvertises());
        existingUser.setContracts(user.getContracts());
        existingUser.setProposalAdvertises(user.getProposalAdvertises());
    }

    @Override
    public void deleteUser(String userId) {
        userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "ID", userId));
        userRepository.deleteById(userId);
    }

    @Override
    public User getUser(String userId) {
        User user = new User(userId);
        return user;
    }
}
