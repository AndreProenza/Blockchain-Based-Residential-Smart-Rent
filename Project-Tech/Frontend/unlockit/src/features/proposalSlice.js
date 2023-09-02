import { createSlice } from '@reduxjs/toolkit'

export const proposalSlice = createSlice({
    name: 'proposal',
    initialState: {
        id: "",
        tenantId: "",
        contractId: "",
        originalPrice: 0,
        proposalPrice: 0,
        active: true,
        accepted: false,
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
        setProposalOriginalPrice: (state, action) => {
            state.originalPrice = action.payload;
        },
        setProposalProposalPrice: (state, action) => {
            state.proposalPrice = action.payload;
        },
        setProposalActive: (state, action) => {
            state.active = action.payload;
        },
        setProposalAccepted: (state, action) => {
            state.accepted = action.payload;
        },
    },
})

export const {
    setProposal,
    setProposalId,
    setProposalTenantId,
    setProposalContractId,
    setProposalOriginalPrice,
    setProposalProposalPrice,
    setProposalActive,
    setProposalAccepted,
} = proposalSlice.actions

export default proposalSlice.reducer