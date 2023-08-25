package io.unlockit.service;

import io.unlockit.model.mongodb.RentalInfo;

import java.util.List;

public interface RentalInfoService {

    RentalInfo saveRentalInfo(RentalInfo rentalInfo);
    List<RentalInfo> getAllRentalInfosByPropertyId(String propertyId);
    RentalInfo getRentalInfoById(String rentalInfoId);
    void deleteRentalInfo(String rentalInfoId);
}
