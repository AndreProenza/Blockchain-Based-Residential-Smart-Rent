package io.unlockit.service.impl;

import io.unlockit.exception.ResourceNotFoundException;
import io.unlockit.model.mongodb.Proposal;
import io.unlockit.repository.ProposalRepository;
import io.unlockit.service.ProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProposalServiceImpl implements ProposalService {

    @Autowired
    private ProposalRepository proposalRepository;

    @Override
    public Proposal saveProposal(Proposal proposal) {
        return proposalRepository.save(proposal);
    }

    @Override
    public List<Proposal> getAllProposalsByTenantId(String tenantId) {
        return proposalRepository.findByTenantId(tenantId);
    }

    @Override
    public List<Proposal> getAllProposalsByContractId(String contractId) {
        return proposalRepository.findByContractId(contractId);
    }

    @Override
    public Proposal updateProposal(Proposal proposal, String proposalId) {
        Proposal existingProposal = proposalRepository.findById(proposalId).orElseThrow(
                () -> new ResourceNotFoundException("Proposal", "ID", proposalId));
        updateProposal(existingProposal, proposal);
        //Save in Database
        proposalRepository.save(existingProposal);
        return existingProposal;
    }

    private void updateProposal(Proposal existingProposal, Proposal proposal) {
        existingProposal.setTenantId(proposal.getTenantId());
        existingProposal.setContractId(proposal.getContractId());
        existingProposal.setOriginalPrice(proposal.getOriginalPrice());
        existingProposal.setProposalPrice(proposal.getProposalPrice());
        existingProposal.setActive(proposal.isActive());
        existingProposal.setStatus(proposal.getStatus());
    }

    @Override
    public Proposal getProposalById(String proposalId) {
        Optional<Proposal> proposal = proposalRepository.findById(proposalId);
        if(proposal.isPresent()) {
            return proposal.get();
        }
        throw new ResourceNotFoundException("Proposal", "ID", proposalId);
    }

    @Override
    public void deleteProposal(String proposalId) {
        proposalRepository.findById(proposalId).orElseThrow(
                () -> new ResourceNotFoundException("Proposal", "ID", proposalId));
        proposalRepository.deleteById(proposalId);
    }
}
