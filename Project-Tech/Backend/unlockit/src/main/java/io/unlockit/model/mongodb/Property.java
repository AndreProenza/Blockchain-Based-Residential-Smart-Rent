package io.unlockit.model.mongodb;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

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
    @Pattern(regexp = "^[a-zA-ZÀ-ÖØ-öø-ÿ\\d\\s,.]{1,50}$", message = "invalid address. Use only letters dots and commas")
    private String address;
    @NotNull(message = "invalid location, cannot be null")
    @Pattern(regexp = "^[a-zA-ZÀ-ÖØ-öø-ÿ\\s]{2,44}$", message = "invalid location")
    private String location;
    @NotNull(message = "invalid type, cannot be null")
    @Pattern(regexp = "^(Room|T[1-4]|T4\\+|House)$", message = "invalid type")
    private String type;
    @NotNull(message = "invalid area, cannot be null")
    @Min(5)
    @Max(10000)
    private int area;
    @NotNull(message = "invalid description, cannot be null")
    @Pattern(regexp = "^[a-zA-ZÀ-ÖØ-öø-ÿ\\d\\s,.]{1,300}$", message = "invalid description. Use only letters dots and commas and numbers")
    private String description;
    private String photo;
}

