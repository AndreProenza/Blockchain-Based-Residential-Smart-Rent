package io.unlockit.repository;

import io.unlockit.model.mongodb.Proposal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProposalRepository extends MongoRepository<Proposal, String> {

    List<Proposal> findByTenantId(String tenantId);
    List<Proposal> findByContractId(String contractId);
}