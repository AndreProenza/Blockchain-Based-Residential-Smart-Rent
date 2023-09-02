package io.unlockit.service;

import io.unlockit.model.mongodb.Property;

import java.util.List;

public interface PropertyService {

    Property saveProperty(Property property);
    List<Property> getAllProperties();
    List<Property> getAllPropertiesByLandlordId(String landlordId);
    Property getPropertyById(String propertyId);
    Property updateProperty(Property property, String propertyId);
    void deleteProperty(String propertyId);
}
