package io.unlockit.model.mongodb;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("user")
public class User {

    @Id
    private String id;
    @Email(message = "invalid email address")
    private String email;
    @Pattern(regexp = "^[a-zA-ZÀ-ÖØ-öø-ÿ\\s]{1,15}$", message = "invalid first name")
    private String firstName;
    @Pattern(regexp = "^[a-zA-ZÀ-ÖØ-öø-ÿ\\s]{1,15}$", message = "invalid last name")
    private String lastName;
    @Min(0)
    @Max(999999999)
    private int phone;
    @Min(0)
    @Max(999999999)
    private int taxID;
    @Pattern(regexp = "^[a-zA-ZÀ-ÖØ-öø-ÿ\\d\\s,.]{1,50}$", message = "invalid address. Use only letters dots, commas and numbers")
    private String address;
    @Pattern(regexp = "^[A-Za-z ]{4,44}$", message = "invalid country")
    private String country;
    @Pattern(regexp = "^[A-Za-z ]{2,44}$", message = "invalid city")
    private String city;
    private List<String> advertises;
    private List<String> contracts;
    private List<String> proposalAdvertises;

    public User(String userId, String email, int phone, int taxId) {
        this.id = userId;
        this.email = email;
        this.phone = phone;
        this.taxID = taxId;
    }

    public User(String userId) {
        this.id = userId;
    }
}
