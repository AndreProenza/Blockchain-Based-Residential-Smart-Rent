package io.unlockit.controller;

import io.unlockit.model.mongodb.Property;
import io.unlockit.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("api/property")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @PostMapping("/register")
    public ResponseEntity<Property> registerProperty(@RequestBody @Valid Property property) {
        Property newProperty = propertyService.saveProperty(property);
        return ResponseEntity.ok().body(newProperty);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyService.getAllProperties();
        return ResponseEntity.ok().body(properties);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable("id") String propertyId) {
        Property property = propertyService.getPropertyById(propertyId);
        return ResponseEntity.ok().body(property);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Property> updateProperty(@RequestBody @Valid Property property, @PathVariable("id") String propertyId) {
        Property updatedProperty = propertyService.updateProperty(property, propertyId);
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteProperty(@PathVariable("id") String propertyId) {
        propertyService.deleteProperty(propertyId);
        return HttpStatus.OK;
    }

}
