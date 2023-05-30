package io.unlockit.service;

import io.unlockit.model.mongodb.Advertise;

import java.util.List;

public interface AdvertiseService {

    Advertise saveAdvertise(Advertise advertise);
    List<Advertise> getAllAdvertises();
    Advertise getAdvertiseById(String advertiseId);
    Advertise updateAdvertise(Advertise advertise, String advertiseId);
    void deleteAdvertise(String advertiseId);
}
