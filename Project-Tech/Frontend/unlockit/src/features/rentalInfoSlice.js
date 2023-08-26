import { createSlice } from '@reduxjs/toolkit'

export const rentalInfoSlice = createSlice({
    name: 'rentalInfo',
    initialState: {
        id: "",
        propertyId: "",
        term: "",
        initialDate: "",
        finalDate: "",
        highestProposal: 0,
        numberOfProposals: 0
    },
    reducers: {
        setRentalInfo: (state, action) => {
            // state.value = action.payload;
            state = { ...state, ...action.payload };
        },
        setRentalInfoId: (state, action) => {
            state.id = action.payload;
        },
        setRentalInfoPropertyId: (state, action) => {
            state.propertyId = action.payload;
        },
        setRentalInfoTerm: (state, action) => {
            state.term = action.payload;
        },
        setRentalInfoInitialDate: (state, action) => {
            state.initialDate = action.payload;
        },
        setRentalInfoFinalDate: (state, action) => {
            state.finalDate = action.payload;
        },
        setRentalInfoHighestProposal: (state, action) => {
            state.highestProposal = action.payload;
        },
        setRentalInfoNumberOfProposals: (state, action) => {
            state.numberOfProposals = action.payload;
        },
    },
})

export const {
    setRentalInfoId,
    setRentalInfoPropertyId,
    setRentalInfoTerm,
    setRentalInfoInitialDate,
    setRentalInfoFinalDate,
    setRentalInfoHighestProposal,
    setRentalInfoNumberOfProposals,
} = rentalInfoSlice.actions;


export default rentalInfoSlice.reducer