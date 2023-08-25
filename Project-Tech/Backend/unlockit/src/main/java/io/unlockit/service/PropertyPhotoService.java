package io.unlockit.service;

import io.unlockit.model.mongodb.PropertyPhoto;

public interface PropertyPhotoService {

    PropertyPhoto savePropertyPhoto(PropertyPhoto propertyPhoto);
    PropertyPhoto getPropertyPhotoById(String propertyPhotoId);
    PropertyPhoto getPropertyPhotoByPropertyId(String propertyId);
    void deletePropertyPhoto(String propertyPhotoId);
}
