package io.unlockit.service.impl;

import io.unlockit.exception.ResourceNotFoundException;
import io.unlockit.model.mongodb.Property;
import io.unlockit.repository.PropertyRepository;
import io.unlockit.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @Override
    public List<Property> getAllPropertiesByLandlordId(String landlordId) {
        return propertyRepository.findByLandlordId(landlordId);
    }

    @Override
    public Property getPropertyById(String propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);
        if(property.isPresent()) {
            return property.get();
        }
        throw new ResourceNotFoundException("Property", "ID", propertyId);
    }

    @Override
    public Property updateProperty(Property property, String propertyId) {
        Property existingProperty = propertyRepository.findById(propertyId).orElseThrow(
                () -> new ResourceNotFoundException("Property", "ID", propertyId));
        updateProperty(existingProperty, property);
        //Save in Database
        propertyRepository.save(existingProperty);
        return existingProperty;
    }

    private void updateProperty(Property existingProperty, Property property) {
        existingProperty.setLandlordId(property.getLandlordId());
        existingProperty.setAddress(property.getAddress());
        existingProperty.setLocation(property.getLocation());
        existingProperty.setType(property.getType());
        existingProperty.setArea(property.getArea());
        existingProperty.setDescription(property.getDescription());
    }

    @Override
    public void deleteProperty(String propertyId) {
        propertyRepository.findById(propertyId).orElseThrow(
                () -> new ResourceNotFoundException("Property", "ID", propertyId));
        propertyRepository.deleteById(propertyId);
    }
}