package io.unlockit.controller;

import io.unlockit.google.GoogleUtils;
import io.unlockit.model.mongodb.RentalInfo;
import io.unlockit.service.RentalInfoService;
import io.unlockit.utils.FrontendEndpoint;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = FrontendEndpoint.frontendUrl)
@RestController
@RequestMapping("api/rental-info")
public class RentalInfoController {

    @Autowired
    private RentalInfoService rentalInfoService;

    @PostMapping("/register")
    public ResponseEntity<RentalInfo> registerRentalInfo(@RequestBody @Valid RentalInfo rentalInfo, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            RentalInfo newRentalInfo = rentalInfoService.saveRentalInfo(rentalInfo);
            return ResponseEntity.ok().body(newRentalInfo);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/all/by/property/{id}")
    public ResponseEntity<List<RentalInfo>> getAllRentalInfosByPropertyId(@PathVariable("id") String propertyId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<RentalInfo> rentalInfos = rentalInfoService.getAllRentalInfosByPropertyId(propertyId);
            return ResponseEntity.ok().body(rentalInfos);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<RentalInfo> getRentalInfoById(@PathVariable("id") String rentalInfoId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            RentalInfo rentalInfo = rentalInfoService.getRentalInfoById(rentalInfoId);
            return ResponseEntity.ok().body(rentalInfo);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRentalInfo(@PathVariable("id") String rentalInfoId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            rentalInfoService.deleteRentalInfo(rentalInfoId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
