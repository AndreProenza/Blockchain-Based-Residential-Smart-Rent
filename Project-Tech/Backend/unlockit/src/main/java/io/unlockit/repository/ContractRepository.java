package io.unlockit.repository;

import io.unlockit.model.mongodb.Contract;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContractRepository extends MongoRepository<Contract, String> {

}
