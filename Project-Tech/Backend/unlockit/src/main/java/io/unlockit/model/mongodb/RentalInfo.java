package io.unlockit.model.mongodb;

import jakarta.validation.constraints.Min;
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
@Document("rental-info")
public class RentalInfo {

    @Id
    private String id;
    private String propertyId;
    @NotNull(message = "invalid term, cannot be null")
    @Pattern(regexp = "^[A-Za-z ]{9,10}$", message = "invalid term")
    private String term;
    @NotNull(message = "invalid initial date, cannot be null")
    @Pattern(regexp = "^(20[2-9][0-9]|2100)-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$", message = "invalid initial date")
    private String initialDate;
    @NotNull(message = "invalid final date, cannot be null")
    @Pattern(regexp = "^(20[2-9][0-9]|2100)-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$", message = "invalid final date")
    private String finalDate;
    @NotNull(message = "invalid highest proposal, cannot be null")
    @Min(1)
    private int highestProposal;
    @NotNull(message = "invalid number of proposals, cannot be null")
    @Min(1)
    private int numberOfProposals;

}
