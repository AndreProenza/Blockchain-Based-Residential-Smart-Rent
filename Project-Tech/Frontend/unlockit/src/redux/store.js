import { configureStore } from '@reduxjs/toolkit'
import userLoginReducer from '../features/userLoginSlice'
import userReducer from '../features/userSlice'
import contractReducer from '../features/contractSlice'
import propertyReducer from '../features/propertySlice'
import propertyPhotoReducer from '../features/propertyPhotoSlice'
import advertiseReducer from '../features/advertiseSlice'
import listingsReducer from '../features/listingsSlice'
import rentalInfoReducer from '../features/rentalInfoSlice'
import proposalReducer from '../features/proposalSlice'


export default configureStore({
    reducer: {
        userLogin: userLoginReducer,
        user: userReducer,
        contract: contractReducer,
        property: propertyReducer,
        propertyPhoto: propertyPhotoReducer,
        advertise: advertiseReducer,
        listings: listingsReducer,
        rentalInfo: rentalInfoReducer,
        proposal: proposalReducer,
    },
})