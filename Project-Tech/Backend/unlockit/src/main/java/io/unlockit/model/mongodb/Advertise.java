package io.unlockit.model.mongodb;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("advertise")
public class Advertise {

    @Id
    private String id;
    @NotNull(message = "invalid property id, cannot be null")
    private String propertyId;
    @NotNull(message = "invalid contract id, cannot be null")
    private String contractId;
    @NotNull(message = "invalid title, cannot be null")
    @Pattern(regexp = "^[A-Za-z ,.]{1,30}$", message = "invalid title, Use only letters dots and commas")
    private String title;
}
