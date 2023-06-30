package io.unlockit.controller;

import io.unlockit.google.GoogleUtils;
import io.unlockit.model.mongodb.Contract;
import io.unlockit.service.ContractService;
import io.unlockit.utils.FrontendEndpoint;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = FrontendEndpoint.frontendUrl)
@RestController
@RequestMapping("api/contract")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @PostMapping("/register")
    public ResponseEntity<Contract> registerContract(@RequestBody @Valid Contract contract, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Contract newContract = contractService.saveContract(contract);
            return ResponseEntity.ok().body(newContract);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Contract>> getAllContracts(@RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<Contract> contracts = contractService.getAllContracts();
            return ResponseEntity.ok().body(contracts);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable("id") String contractId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Contract contract = contractService.getContractById(contractId);
            return ResponseEntity.ok().body(contract);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Contract> updateContract(@RequestBody @Valid Contract contract, @PathVariable("id") String contractId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Contract updatedContract = contractService.updateContract(contract, contractId);
            return ResponseEntity.ok(updatedContract);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteContract(@PathVariable("id") String contractId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            contractService.deleteContract(contractId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
