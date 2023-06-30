package io.unlockit.controller;

import io.unlockit.google.GoogleUtils;
import io.unlockit.model.mongodb.User;
import io.unlockit.service.UserService;
import io.unlockit.utils.FrontendEndpoint;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = FrontendEndpoint.frontendUrl)
@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/loggedin")
    public ResponseEntity<Void> isLoggedIn(@RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/login/time")
    public ResponseEntity<String> getLoginExpireTime(@RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            String expireTime = GoogleUtils.getUserLoginExpireTime(authorizationHeader);
            if (expireTime == null) {
                return ResponseEntity.badRequest().body(null);
            }
            return ResponseEntity.ok().body(expireTime);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/login/get/userid")
    public ResponseEntity<User> getUserId(@RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<String> userInfo = GoogleUtils.getUserInfo(authorizationHeader);
            if (userInfo == null) {
                return ResponseEntity.badRequest().body(null);
            }
            User user = userService.getUser(userInfo.get(0));
            return ResponseEntity.ok().body(user);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<String> userInfo = GoogleUtils.getUserInfo(authorizationHeader);
            if (userInfo == null) {
                return ResponseEntity.badRequest().body(null);
            }
            User newUser = userService.handleLogin(userInfo.get(0), userInfo.get(1));
            return ResponseEntity.ok().body(newUser);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(@RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok().body(users);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/getbyemail/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok().body(user);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String userId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok().body(user);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@RequestBody @Valid User user, @PathVariable("id") String userId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            User updatedUser = userService.updateUser(user, userId);
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PostMapping("/updatebyemail/{email}")
    public ResponseEntity<User> updateUserByEmail(@RequestBody @Valid User user, @PathVariable("email") String email, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            User updatedUser = userService.updateUserByEmail(user, email);
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String userId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            userService.deleteUser(userId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
