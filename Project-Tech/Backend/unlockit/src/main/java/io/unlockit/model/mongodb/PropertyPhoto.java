package io.unlockit.model.mongodb;

import jakarta.validation.constraints.NotNull;
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
@Document("property-photo")
public class PropertyPhoto {

    @Id
    private String id;
    @NotNull(message = "invalid property photo id, cannot be null")
    private String propertyId;
    private String photo;
}

