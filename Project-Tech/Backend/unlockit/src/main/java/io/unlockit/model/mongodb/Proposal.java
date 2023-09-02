package io.unlockit.model.mongodb;

import jakarta.validation.constraints.Min;
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
@Document("proposal")
public class Proposal {

    @Id
    private String id;
    @NotNull(message = "invalid tenant id, cannot be null")
    private String tenantId;
    @NotNull(message = "invalid contract id, cannot be null")
    private String contractId;
    @NotNull(message = "invalid price, cannot be null")
    @Min(1)
    private int originalPrice;
    @Min(1)
    private int proposalPrice;
    private boolean active;
    @NotNull()
    private String status;
}
