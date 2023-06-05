import { createSlice } from '@reduxjs/toolkit'

export const listingsSlice = createSlice({
    name: 'listings',
    initialState: {
        location: "",
        type: "",
        priceMin: 0,
        priceMax: 0,
        sizeMin: 0,
        sizeMax: 0,
    },
    reducers: {
        setListings: (state, action) => {
            // state.value = action.payload;
            state = { ...state, ...action.payload };
        },
        setListingsLocation: (state, action) => {
            state.location = action.payload;
        },
        setListingsType: (state, action) => {
            state.type = action.payload;
        },
        setListingsPriceMin: (state, action) => {
            state.priceMin = action.payload;
        },
        setListingsPriceMax: (state, action) => {
            state.priceMax = action.payload;
        },
        setListingsSizeMin: (state, action) => {
            state.sizeMin = action.payload;
        },
        setListingsSizeMax: (state, action) => {
            state.sizeMax = action.payload;
        },
    },
})

export const {
    setListings,
    setListingsLocation,
    setListingsType,
    setListingsPriceMin,
    setListingsPriceMax,
    setListingsSizeMin,
    setListingsSizeMax,
} = listingsSlice.actions

export default listingsSlice.reducer