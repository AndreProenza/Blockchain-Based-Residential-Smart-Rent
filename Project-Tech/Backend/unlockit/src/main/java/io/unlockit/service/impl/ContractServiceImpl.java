package io.unlockit.service.impl;

import io.unlockit.exception.ResourceNotFoundException;
import io.unlockit.model.mongodb.Contract;
import io.unlockit.repository.ContractRepository;
import io.unlockit.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractServiceImpl implements ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Override
    public Contract saveContract(Contract contract) {
        return contractRepository.save(contract);
    }

    @Override
    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    @Override
    public Contract getContractById(String contractId) {
        Optional<Contract> contract = contractRepository.findById(contractId);
        if(contract.isPresent()) {
            return contract.get();
        }
        throw new ResourceNotFoundException("Contract", "ID", contractId);
    }

    @Override
    public Contract updateContract(Contract contract, String contractId) {
        Contract existingContract = contractRepository.findById(contractId).orElseThrow(
                () -> new ResourceNotFoundException("Contract", "ID", contractId));
        updateContract(existingContract, contract);
        //Save in Database
        contractRepository.save(existingContract);
        return existingContract;
    }

    private void updateContract(Contract existingContract, Contract contract) {
        existingContract.setPropertyId(contract.getPropertyId());
        existingContract.setTerm(contract.getTerm());
        existingContract.setInitialDate(contract.getInitialDate());
        existingContract.setFinalDate(contract.getFinalDate());
        existingContract.setPrice(contract.getPrice());
        existingContract.setConditions(contract.getConditions());
        existingContract.setLandlordId(contract.getLandlordId());
        existingContract.setTenantId(contract.getTenantId());
    }

    @Override
    public void deleteContract(String contractId) {
        contractRepository.findById(contractId).orElseThrow(
                () -> new ResourceNotFoundException("Contract", "ID", contractId));
        contractRepository.deleteById(contractId);
    }
}
