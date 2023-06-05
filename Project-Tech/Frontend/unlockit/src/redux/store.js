import { configureStore } from '@reduxjs/toolkit'
import userLoginReducer from '../features/userLoginSlice'
import userReducer from '../features/userSlice'
import contractReducer from '../features/contractSlice'
import propertyReducer from '../features/propertySlice'
import advertiseReducer from '../features/advertiseSlice'
import listingsReducer from '../features/listingsSlice'

export default configureStore({
    reducer: {
        userLogin: userLoginReducer,
        user: userReducer,
        contract: contractReducer,
        property: propertyReducer,
        advertise: advertiseReducer,
        listings: listingsReducer,
    },
})