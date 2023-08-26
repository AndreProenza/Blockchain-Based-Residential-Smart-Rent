import { createSlice } from '@reduxjs/toolkit'

export const propertyPhotoSlice = createSlice({
    name: 'propertyPhoto',
    initialState: {
        id: "",
        propertyId: "",
        photo: ""
    },
    reducers: {
        setPropertyPhoto: (state, action) => {
            // state.value = action.payload;
            state = { ...state, ...action.payload };
        },
        setPropertyPhotoId: (state, action) => {
            state.id = action.payload;
        },
        setPropertyPhotoPropertyId: (state, action) => {
            state.propertyId = action.payload;
        },
        setPropertyPhotoPhoto: (state, action) => {
            state.photo = action.payload;
        },
    },
})

export const {
    setPropertyPhotoId,
    setPropertyPhotoPropertyId,
    setPropertyPhotoPhoto,
} = propertyPhotoSlice.actions;

export default propertyPhotoSlice.reducer