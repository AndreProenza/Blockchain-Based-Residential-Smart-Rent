import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
        taxId: 0,
        address: "",
        country: "",
        city: "",
        advertises: [],
        landlordContracts: [],
        tenantContracts: [],
        proposalAdvertises: [],
        proposals: [],
    },
    reducers: {
        setUser: (state, action) => {
            // state.value = action.payload;
            state = { ...state, ...action.payload };
        },
        setUserId: (state, action) => {
            state.id = action.payload;
        },
        setUserFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setUserLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setUserEmail: (state, action) => {
            state.email = action.payload;
        },
        setUserPhone: (state, action) => {
            state.phone = action.payload;
        },
        setUserTaxId: (state, action) => {
            state.taxId = action.payload;
        },
        setUserAddress: (state, action) => {
            state.address = action.payload;
        },
        setUserCountry: (state, action) => {
            state.country = action.payload;
        },
        setUserCity: (state, action) => {
            state.city = action.payload;
        },
        setUserAdvertises: (state, action) => {
            state.advertises = action.payload;
        },
        setUserLandlordContracts: (state, action) => {
            state.landlordContracts = action.payload;
        },
        setUserTenantContracts: (state, action) => {
            state.tenantContracts = action.payload;
        },
        setUserProposalAdvertises: (state, action) => {
            state.proposalAdvertises = action.payload;
        },
        setUserProposals: (state, action) => {
            state.proposals = action.payload;
        },
    },
})

export const {
    setUser,
    setUserId,
    setUserFirstName,
    setUserLastName,
    setUserEmail,
    setUserPhone,
    setUserTaxId,
    setUserAddress,
    setUserCountry,
    setUserCity,
    setUserAdvertises,
    setUserLandlordContracts,
    setUserTenantContracts,
    setUserProposalAdvertises,
    setUserProposals,
} = userSlice.actions;

export default userSlice.reducer