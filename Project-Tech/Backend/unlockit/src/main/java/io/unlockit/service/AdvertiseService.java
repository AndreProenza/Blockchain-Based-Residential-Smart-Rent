package io.unlockit.service;

import io.unlockit.model.mongodb.Advertise;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface AdvertiseService {

    Advertise saveAdvertise(Advertise advertise);
    List<Advertise> getAllAdvertises();
    List<Advertise> getAllAdvertisesByUserId(String userId);
    List<Advertise> getAllAdvertisesByLocation(String location);
    Advertise getAdvertiseById(String advertiseId);
    Advertise updateAdvertise(Advertise advertise, String advertiseId);
    void deleteAdvertise(String advertiseId);
}
