import { createSlice } from '@reduxjs/toolkit'

export const proposalSlice = createSlice({
    name: 'proposal',
    initialState: {
        id: "",
        tenantId: "",
        contractId: "",
        price: 0,
    },
    reducers: {
        setProposal: (state, action) => {
            // state.value = action.payload;
            state = { ...state, ...action.payload };
        },
        setProposalId: (state, action) => {
            state.id = action.payload;
        },
        setProposalTenantId: (state, action) => {
            state.tenantId = action.payload;
        },
        setProposalContractId: (state, action) => {
            state.contractId = action.payload;
        },
        setProposalPrice: (state, action) => {
            state.price = action.payload;
        },
    },
})

export const {
    setProposal,
    setProposalId,
    setProposalTenantId,
    setProposalContractId,
    setProposalPrice,
} = proposalSlice.actions

export default proposalSlice.reducer