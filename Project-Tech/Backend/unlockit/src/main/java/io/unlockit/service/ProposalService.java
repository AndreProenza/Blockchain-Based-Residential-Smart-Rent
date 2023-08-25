package io.unlockit.service;

import io.unlockit.model.mongodb.Proposal;

import java.util.List;

public interface ProposalService {

    Proposal saveProposal(Proposal proposal);
    List<Proposal> getAllProposalsByTenantId(String tenantId);
    List<Proposal> getAllProposalsByContractId(String contractId);
    Proposal getProposalById(String proposalId);
    void deleteProposal(String proposalId);

}
