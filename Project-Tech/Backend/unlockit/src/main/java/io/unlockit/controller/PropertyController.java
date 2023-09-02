package io.unlockit.controller;

import io.unlockit.google.GoogleUtils;
import io.unlockit.model.mongodb.Property;
import io.unlockit.service.PropertyService;
import io.unlockit.utils.FrontendEndpoint;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = FrontendEndpoint.frontendUrl)
@RestController
@RequestMapping("api/property")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @PostMapping("/register")
    public ResponseEntity<Property> registerProperty(@RequestBody @Valid Property property, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Property newProperty = propertyService.saveProperty(property);
            return ResponseEntity.ok().body(newProperty);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Property>> getAllProperties(@RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<Property> properties = propertyService.getAllProperties();
            return ResponseEntity.ok().body(properties);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/landlord/all/by/{id}")
    public ResponseEntity<List<Property>> getAllProperties(@PathVariable("id") String landlordId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<Property> properties = propertyService.getAllPropertiesByLandlordId(landlordId);
            return ResponseEntity.ok().body(properties);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable("id") String propertyId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Property property = propertyService.getPropertyById(propertyId);
            return ResponseEntity.ok().body(property);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Property> updateProperty(@RequestBody @Valid Property property, @PathVariable("id") String propertyId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Property updatedProperty = propertyService.updateProperty(property, propertyId);
            return ResponseEntity.ok(updatedProperty);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable("id") String propertyId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            propertyService.deleteProperty(propertyId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

}
