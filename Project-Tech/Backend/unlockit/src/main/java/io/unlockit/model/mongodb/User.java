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
    @Pattern(regexp = "^[A-Za-z ]{1,15}$", message = "invalid first name")
    private String firstName;
    @Pattern(regexp = "^[A-Za-z ]{1,15}$", message = "invalid last name")
    private String lastName;
    @Min(900000000)
    @Max(999999999)
    private int phone;
    @Min(100000000)
    @Max(999999999)
    private int taxID;
    @Pattern(regexp = "^[A-Za-z ,.]{1,50}$", message = "invalid address. Use only letters dots and commas")
    private String address;
    @Pattern(regexp = "^[A-Za-z ]{4,44}$", message = "invalid country")
    private String country;
    @Pattern(regexp = "^[A-Za-z ]{2,44}$", message = "invalid city")
    private String city;
    private List<String> advertises;
    private List<String> contracts;
}
