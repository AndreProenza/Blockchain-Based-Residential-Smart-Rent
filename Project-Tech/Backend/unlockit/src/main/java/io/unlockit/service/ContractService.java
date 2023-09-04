package io.unlockit.service;

import io.unlockit.model.mongodb.Contract;

import java.util.List;

public interface ContractService {

    Contract saveContract(Contract contract);
    List<Contract> getAllContracts();
    List<Contract> getAllContractByPropertyId(String propertyId);
    Contract getContractById(String contractId);
    Contract updateContract(Contract contract, String contractId);
    void deleteContract(String contractId);
}
