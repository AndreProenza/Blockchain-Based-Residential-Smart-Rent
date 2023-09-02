package io.unlockit.service.impl;

import io.unlockit.exception.ResourceNotFoundException;
import io.unlockit.model.mongodb.Advertise;
import io.unlockit.repository.AdvertiseRepository;
import io.unlockit.service.AdvertiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public List<Advertise> getAllAdvertisesByUserId(String userId) {
        List<Advertise> advertises = getAllAdvertises();
        List<Advertise> filteredAdvertises = new ArrayList<>();

        for (Advertise advertise : advertises) {
            if (advertise.getUserId().equals(userId)) {
                filteredAdvertises.add(advertise);
            }
        }
        return filteredAdvertises;
    }

    @Override
    public List<Advertise> getAllAdvertisesByLocation(String location) {
        List<Advertise> advertises = getAllAdvertises();
        List<Advertise> filteredAdvertises = new ArrayList<>();

        for (Advertise advertise : advertises) {
            if (advertise.getLocation().equals(location)) {
                filteredAdvertises.add(advertise);
            }
        }
        return filteredAdvertises;
    }

    @Override
    public List<Advertise> getAllAdvertisesByUserAdvertisesList(List<String> advertisesIds) {
        List<Advertise> advertises = new ArrayList<>();
        for (String advertiseId : advertisesIds) {
            advertises.add(getAdvertiseById(advertiseId));
        }
        return advertises;
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
        existingAdvertise.setUserId(advertise.getUserId());
        existingAdvertise.setLocation(advertise.getLocation());
        existingAdvertise.setActiveUsers(advertise.getActiveUsers());
        existingAdvertise.setActive(advertise.isActive());
    }

    @Override
    public void deleteAdvertise(String advertiseId) {
        advertiseRepository.findById(advertiseId).orElseThrow(
                () -> new ResourceNotFoundException("Advertise", "ID", advertiseId));
        advertiseRepository.deleteById(advertiseId);
    }
}
