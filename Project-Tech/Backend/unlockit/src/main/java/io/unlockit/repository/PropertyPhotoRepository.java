package io.unlockit.repository;

import io.unlockit.model.mongodb.PropertyPhoto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PropertyPhotoRepository extends MongoRepository<PropertyPhoto, String> {

    Optional<PropertyPhoto> findByPropertyId(String propertyId);
}
