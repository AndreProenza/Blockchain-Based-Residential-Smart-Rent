package io.unlockit.repository;

import io.unlockit.model.mongodb.Property;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PropertyRepository extends MongoRepository<Property, String> {

}
