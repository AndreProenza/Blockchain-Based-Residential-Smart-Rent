package io.unlockit.controller;

import io.unlockit.model.mongodb.Advertise;
import io.unlockit.service.AdvertiseService;
import io.unlockit.utils.FrontendEndpoint;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = FrontendEndpoint.frontendUrl)
@RestController
@RequestMapping("api/advertise")
public class AdvertiseController {

    @Autowired
    private AdvertiseService advertiseService;

    @PostMapping("/register")
    public ResponseEntity<Advertise> registerAdvertise(@RequestBody @Valid Advertise advertise) {
        Advertise newAdvertise = advertiseService.saveAdvertise(advertise);
        return ResponseEntity.ok().body(newAdvertise);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Advertise>> getAllAdvertises() {
        List<Advertise> advertises = advertiseService.getAllAdvertises();
        return ResponseEntity.ok().body(advertises);
    }

    @GetMapping("/user/get/all/{id}")
    public ResponseEntity<List<Advertise>> getAllAdvertisesByUserId(@PathVariable("id") String userId) {
        List<Advertise> advertises = advertiseService.getAllAdvertisesByUserId(userId);
        return ResponseEntity.ok().body(advertises);
    }

    @GetMapping("/location/get/all/{id}")
    public ResponseEntity<List<Advertise>> getAllAdvertisesByLocation(@PathVariable("id") String location) {
        List<Advertise> advertises = advertiseService.getAllAdvertisesByLocation(location);
        return ResponseEntity.ok().body(advertises);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Advertise> getAdvertiseById(@PathVariable("id") String advertiseId) {
        Advertise advertise = advertiseService.getAdvertiseById(advertiseId);
        return ResponseEntity.ok().body(advertise);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Advertise> updateAdvertise(@RequestBody @Valid Advertise advertise, @PathVariable("id") String advertiseId) {
        Advertise updatedAdvertise = advertiseService.updateAdvertise(advertise, advertiseId);
        return ResponseEntity.ok(updatedAdvertise);
    }

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteAdvertise(@PathVariable("id") String advertiseId) {
        advertiseService.deleteAdvertise(advertiseId);
        return HttpStatus.OK;
    }
}
