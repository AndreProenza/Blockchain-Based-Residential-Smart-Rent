import { createSlice } from '@reduxjs/toolkit'

export const propertySlice = createSlice({
    name: 'property',
    initialState: {
        id: "",
        location: "",
        type: "",
        area: 0,
        propertyAddress: "",
        description: "",
        photo: "",
        landlordId: ""
    },
    reducers: {
        setProperty: (state, action) => {
            // state.value = action.payload;
            state = { ...state, ...action.payload };
        },
        setPropertyId: (state, action) => {
            state.id = action.payload;
        },
        setPropertyLocation: (state, action) => {
            state.location = action.payload;
        },
        setPropertyType: (state, action) => {
            state.type = action.payload;
        },
        setPropertyArea: (state, action) => {
            state.area = action.payload;
        },
        setPropertyAddress: (state, action) => {
            state.propertyAddress = action.payload;
        },
        setPropertyDescription: (state, action) => {
            state.description = action.payload;
        },
        setPropertyPhoto: (state, action) => {
            state.photo = action.payload;
        },
        setPropertyLandlordId: (state, action) => {
            state.landlordId = action.payload;
        },
    },
})

export const {
    setPropertyId,
    setPropertyLocation,
    setPropertyType,
    setPropertyArea,
    setPropertyAddress,
    setPropertyDescription,
    setPropertyPhoto,
    setPropertyLandlordId,
} = propertySlice.actions;

export default propertySlice.reducer