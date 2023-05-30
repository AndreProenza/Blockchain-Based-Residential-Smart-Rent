package io.unlockit.service.impl;

import io.unlockit.exception.ResourceNotFoundException;
import io.unlockit.model.mongodb.Advertise;
import io.unlockit.repository.AdvertiseRepository;
import io.unlockit.service.AdvertiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdvertiseServiceImpl implements AdvertiseService {

    @Autowired
    private AdvertiseRepository advertiseRepository;

    @Override
    public Advertise saveAdvertise(Advertise advertise) {
        return advertiseRepository.save(advertise);
    }

    @Override
    public List<Advertise> getAllAdvertises() {
        return advertiseRepository.findAll();
    }

    @Override
    public Advertise getAdvertiseById(String advertiseId) {
        Optional<Advertise> advertise = advertiseRepository.findById(advertiseId);
        if(advertise.isPresent()) {
            return advertise.get();
        }
        throw new ResourceNotFoundException("Advertise", "ID", advertiseId);
    }

    @Override
    public Advertise updateAdvertise(Advertise advertise, String advertiseId) {
        Advertise existingAdvertise = advertiseRepository.findById(advertiseId).orElseThrow(
                () -> new ResourceNotFoundException("Advertise", "ID", advertiseId));
        updateAdvertise(existingAdvertise, advertise);
        //Save in Database
        advertiseRepository.save(existingAdvertise);
        return existingAdvertise;
    }

    private void updateAdvertise(Advertise existingAdvertise, Advertise advertise) {
        existingAdvertise.setPropertyId(advertise.getPropertyId());
        existingAdvertise.setContractId(advertise.getContractId());
        existingAdvertise.setTitle(advertise.getTitle());
    }

    @Override
    public void deleteAdvertise(String advertiseId) {
        advertiseRepository.findById(advertiseId).orElseThrow(
                () -> new ResourceNotFoundException("Advertise", "ID", advertiseId));
        advertiseRepository.deleteById(advertiseId);
    }
}
