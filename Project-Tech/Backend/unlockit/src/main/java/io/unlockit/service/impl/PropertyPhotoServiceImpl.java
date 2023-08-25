package io.unlockit.service.impl;

import io.unlockit.exception.ResourceNotFoundException;
import io.unlockit.model.mongodb.PropertyPhoto;
import io.unlockit.repository.PropertyPhotoRepository;
import io.unlockit.service.PropertyPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PropertyPhotoServiceImpl implements PropertyPhotoService {

    @Autowired
    private PropertyPhotoRepository propertyPhotoRepository;

    @Override
    public PropertyPhoto savePropertyPhoto(PropertyPhoto propertyPhoto) {
        return propertyPhotoRepository.save(propertyPhoto);
    }

    @Override
    public PropertyPhoto getPropertyPhotoById(String propertyPhotoId) {
        Optional<PropertyPhoto> propertyPhoto = propertyPhotoRepository.findById(propertyPhotoId);
        if(propertyPhoto.isPresent()) {
            return propertyPhoto.get();
        }
        throw new ResourceNotFoundException("PropertyPhoto", "ID", propertyPhotoId);
    }

    @Override
    public PropertyPhoto getPropertyPhotoByPropertyId(String propertyId) {
        Optional<PropertyPhoto> propertyPhoto = propertyPhotoRepository.findByPropertyId(propertyId);
        if(propertyPhoto.isPresent()) {
            return propertyPhoto.get();
        }
        throw new ResourceNotFoundException("PropertyPhoto", "Property ID", propertyId);
    }

    @Override
    public void deletePropertyPhoto(String propertyPhotoId) {
        propertyPhotoRepository.findById(propertyPhotoId).orElseThrow(
                () -> new ResourceNotFoundException("PropertyPhoto", "ID", propertyPhotoId));
        propertyPhotoRepository.deleteById(propertyPhotoId);
    }
}