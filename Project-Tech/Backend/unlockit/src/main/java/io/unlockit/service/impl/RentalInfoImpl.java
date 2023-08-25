package io.unlockit.service.impl;

import io.unlockit.exception.ResourceNotFoundException;
import io.unlockit.model.mongodb.RentalInfo;
import io.unlockit.repository.RentalInfoRepository;
import io.unlockit.service.RentalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentalInfoImpl implements RentalInfoService {

    @Autowired
    private RentalInfoRepository rentalInfoRepository;

    @Override
    public RentalInfo saveRentalInfo(RentalInfo rentalInfo) {
        return rentalInfoRepository.save(rentalInfo);
    }

    @Override
    public List<RentalInfo> getAllRentalInfosByPropertyId(String propertyId) {
        return rentalInfoRepository.findByPropertyId(propertyId);
    }

    @Override
    public RentalInfo getRentalInfoById(String rentalInfoId) {
        Optional<RentalInfo> rentalInfo = rentalInfoRepository.findById(rentalInfoId);
        if(rentalInfo.isPresent()) {
            return rentalInfo.get();
        }
        throw new ResourceNotFoundException("RentalInfo", "ID", rentalInfoId);
    }

    @Override
    public void deleteRentalInfo(String rentalInfoId) {
        rentalInfoRepository.findById(rentalInfoId).orElseThrow(
                () -> new ResourceNotFoundException("RentalInfo", "ID", rentalInfoId));
        rentalInfoRepository.deleteById(rentalInfoId);
    }
}
