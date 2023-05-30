package io.unlockit.repository;

import io.unlockit.model.mongodb.Advertise;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdvertiseRepository extends MongoRepository<Advertise, String> {

}