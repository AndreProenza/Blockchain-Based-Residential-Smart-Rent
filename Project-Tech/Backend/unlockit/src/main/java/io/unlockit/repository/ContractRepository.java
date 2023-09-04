package io.unlockit.repository;

import io.unlockit.model.mongodb.Contract;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContractRepository extends MongoRepository<Contract, String> {

    List<Contract> findByPropertyId(String propertyId);
}
