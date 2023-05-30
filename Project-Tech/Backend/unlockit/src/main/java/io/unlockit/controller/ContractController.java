package io.unlockit.controller;

import io.unlockit.model.mongodb.Contract;
import io.unlockit.service.ContractService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("api/contract")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @PostMapping("/register")
    public ResponseEntity<Contract> registerContract(@RequestBody @Valid Contract contract) {
        Contract newContract = contractService.saveContract(contract);
        return ResponseEntity.ok().body(newContract);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Contract>> getAllContracts() {
        List<Contract> contracts = contractService.getAllContracts();
        return ResponseEntity.ok().body(contracts);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable("id") String contractId) {
        Contract contract = contractService.getContractById(contractId);
        return ResponseEntity.ok().body(contract);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Contract> updateContract(@RequestBody @Valid Contract contract, @PathVariable("id") String contractId) {
        Contract updatedContract = contractService.updateContract(contract, contractId);
        return ResponseEntity.ok(updatedContract);
    }

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteContract(@PathVariable("id") String contractId) {
        contractService.deleteContract(contractId);
        return HttpStatus.OK;
    }
}
