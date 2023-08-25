package io.unlockit.repository;

import io.unlockit.model.mongodb.RentalInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RentalInfoRepository extends MongoRepository<RentalInfo, String> {

    List<RentalInfo> findByPropertyId(String propertyId);
}
