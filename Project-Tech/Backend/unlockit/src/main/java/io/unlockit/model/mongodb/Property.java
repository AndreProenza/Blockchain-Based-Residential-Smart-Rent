package io.unlockit.model.mongodb;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("property")
public class Property {

    @Id
    private String id;
    @NotNull(message = "invalid landlord id, cannot be null")
    private String landlordId;
    @NotNull(message = "invalid address, cannot be null")
    @Pattern(regexp = "^[A-Za-z ,.]{1,50}$", message = "invalid address. Use only letters dots and commas")
    private String address;
    @NotNull(message = "invalid location, cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{2,44}$", message = "invalid location")
    private String location;
    @NotNull(message = "invalid type, cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{2,5}$", message = "invalid type")
    private String type;
    @NotNull(message = "invalid area, cannot be null")
    @Min(40)
    private int area;
    @NotNull(message = "invalid description, cannot be null")
    @Pattern(regexp = "^[A-Za-z ,.]{1,300}$", message = "Use only letters dots and commas")
    private String description;
    private Binary photo;
}

