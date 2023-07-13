import { createSlice } from '@reduxjs/toolkit'

export const advertiseSlice = createSlice({
    name: 'advertise',
    initialState: {
        id: "",
        propertyId: "",
        contractId: "",
        title: "",
        userId: "",
        location: "",
        active: true,
    },
    reducers: {
        setAdvertise: (state, action) => {
            // state.value = action.payload;
            state = { ...state, ...action.payload };
        },
        setAdvertiseId: (state, action) => {
            state.id = action.payload;
        },
        setAdvertisePropertyId: (state, action) => {
            state.propertyId = action.payload;
        },
        setAdvertiseContractId: (state, action) => {
            state.contractId = action.payload;
        },
        setAdvertiseTitle: (state, action) => {
            state.title = action.payload;
        },
        setAdvertiseUserId: (state, action) => {
            state.userId = action.payload;
        },
        setAdvertiseLocation: (state, action) => {
            state.location = action.payload;
        },
        setAdvertiseActive: (state, action) => {
            state.active = action.payload;
        },
    },
})

export const {
    setAdvertise,
    setAdvertiseId,
    setAdvertisePropertyId,
    setAdvertiseContractId,
    setAdvertiseTitle,
    setAdvertiseUserId,
    setAdvertiseLocation,
    setAdvertiseActive,
} = advertiseSlice.actions

export default advertiseSlice.reducer