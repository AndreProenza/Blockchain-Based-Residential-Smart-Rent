import { createSlice } from '@reduxjs/toolkit'

export const contractSlice = createSlice({
    name: 'contract',
    initialState: {
        id: "",
        propertyId: "",
        term: "",
        initialDate: "",
        finalDate: "",
        price: 0,
        conditions: "",
        landlordId: "",
        tenantId: ""
    },
    reducers: {
        setContract: (state, action) => {
            // state.value = action.payload;
            state = { ...state, ...action.payload };
        },
        setContractId: (state, action) => {
            state.id = action.payload;
        },
        setContractPropertyId: (state, action) => {
            state.propertyId = action.payload;
        },
        setContractTerm: (state, action) => {
            state.term = action.payload;
        },
        setContractInitialDate: (state, action) => {
            state.initialDate = action.payload;
        },
        setContractFinalDate: (state, action) => {
            state.finalDate = action.payload;
        },
        setContractPrice: (state, action) => {
            state.price = action.payload;
        },
        setContractConditions: (state, action) => {
            state.conditions = action.payload;
        },
        setContractLandlordId: (state, action) => {
            state.landlordId = action.payload;
        },
        setContractTenantId: (state, action) => {
            state.tenantId = action.payload;
        },
    },
})

export const {
    setContractId,
    setContractPropertyId,
    setContractTerm,
    setContractInitialDate,
    setContractFinalDate,
    setContractPrice,
    setContractConditions,
    setContractLandlordId,
    setContractTenantId,
} = contractSlice.actions;


export default contractSlice.reducer