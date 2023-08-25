package io.unlockit.controller;

import io.unlockit.google.GoogleUtils;
import io.unlockit.model.mongodb.PropertyPhoto;
import io.unlockit.service.PropertyPhotoService;
import io.unlockit.utils.FrontendEndpoint;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = FrontendEndpoint.frontendUrl)
@RestController
@RequestMapping("api/property-photo")
public class PropertyPhotoController {

    @Autowired
    private PropertyPhotoService propertyPhotoService;

    @PostMapping("/register")
    public ResponseEntity<PropertyPhoto> registerPropertyPhoto(@RequestBody @Valid PropertyPhoto propertyPhoto, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            PropertyPhoto newPropertyPhoto = propertyPhotoService.savePropertyPhoto(propertyPhoto);
            return ResponseEntity.ok().body(newPropertyPhoto);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PropertyPhoto> getPropertyPhotoById(@PathVariable("id") String propertyPhotoId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            PropertyPhoto propertyPhoto = propertyPhotoService.getPropertyPhotoById(propertyPhotoId);
            return ResponseEntity.ok().body(propertyPhoto);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/property/get/{id}")
    public ResponseEntity<PropertyPhoto> getPropertyPhotoByPropertyId(@PathVariable("id") String propertyId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            PropertyPhoto propertyPhoto = propertyPhotoService.getPropertyPhotoByPropertyId(propertyId);
            return ResponseEntity.ok().body(propertyPhoto);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePropertyPhoto(@PathVariable("id") String propertyPhotoId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            propertyPhotoService.deletePropertyPhoto(propertyPhotoId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

}
