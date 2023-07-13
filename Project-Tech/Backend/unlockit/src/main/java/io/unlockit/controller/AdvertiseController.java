package io.unlockit.controller;

import io.unlockit.google.GoogleUtils;
import io.unlockit.model.mongodb.Advertise;
import io.unlockit.service.AdvertiseService;
import io.unlockit.utils.FrontendEndpoint;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<Advertise> registerAdvertise(@RequestBody @Valid Advertise advertise, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Advertise newAdvertise = advertiseService.saveAdvertise(advertise);
            return ResponseEntity.ok().body(newAdvertise);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Advertise>> getAllAdvertises(@RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<Advertise> advertises = advertiseService.getAllAdvertises();
            return ResponseEntity.ok().body(advertises);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/user/get/all/{id}")
    public ResponseEntity<List<Advertise>> getAllAdvertisesByUserId(@PathVariable("id") String userId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<Advertise> advertises = advertiseService.getAllAdvertisesByUserId(userId);
            return ResponseEntity.ok().body(advertises);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/user/get/advertises")
    public ResponseEntity<List<Advertise>> getAllAdvertisesByUserAdvertisesList(@RequestHeader("Authorization") String authorizationHeader,
                                                                                @RequestParam("advertisesIds") List<String> advertisesIds) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<Advertise> advertises = advertiseService.getAllAdvertisesByUserAdvertisesList(advertisesIds);
            return ResponseEntity.ok().body(advertises);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/location/get/all/{id}")
    public ResponseEntity<List<Advertise>> getAllAdvertisesByLocation(@PathVariable("id") String location, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<Advertise> advertises = advertiseService.getAllAdvertisesByLocation(location);
            return ResponseEntity.ok().body(advertises);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Advertise> getAdvertiseById(@PathVariable("id") String advertiseId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Advertise advertise = advertiseService.getAdvertiseById(advertiseId);
            return ResponseEntity.ok().body(advertise);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Advertise> updateAdvertise(@RequestBody @Valid Advertise advertise, @PathVariable("id") String advertiseId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Advertise updatedAdvertise = advertiseService.updateAdvertise(advertise, advertiseId);
            return ResponseEntity.ok(updatedAdvertise);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAdvertise(@PathVariable("id") String advertiseId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            advertiseService.deleteAdvertise(advertiseId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }



}
