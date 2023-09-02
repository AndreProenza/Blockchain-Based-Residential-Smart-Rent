package io.unlockit.controller;

import io.unlockit.google.GoogleUtils;
import io.unlockit.model.mongodb.Contract;
import io.unlockit.model.mongodb.Proposal;
import io.unlockit.service.ProposalService;
import io.unlockit.utils.FrontendEndpoint;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = FrontendEndpoint.frontendUrl)
@RestController
@RequestMapping("api/proposal")
public class ProposalController {

    @Autowired
    private ProposalService proposalService;

    @PostMapping("/register")
    public ResponseEntity<Proposal> registerProposal(@RequestBody @Valid Proposal proposal, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Proposal newProposal = proposalService.saveProposal(proposal);
            return ResponseEntity.ok().body(newProposal);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/all/by/tenant/{id}")
    public ResponseEntity<List<Proposal>> getAllProposalsByTenantId(@PathVariable("id") String tenantId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<Proposal> proposals = proposalService.getAllProposalsByTenantId(tenantId);
            return ResponseEntity.ok().body(proposals);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/all/by/contract/{id}")
    public ResponseEntity<List<Proposal>> getAllProposalsByContractId(@PathVariable("id") String contractId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            List<Proposal> proposals = proposalService.getAllProposalsByContractId(contractId);
            return ResponseEntity.ok().body(proposals);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Proposal> updateProposal(@RequestBody @Valid Proposal proposal, @PathVariable("id") String proposalId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Proposal updatedProposal = proposalService.updateProposal(proposal, proposalId);
            return ResponseEntity.ok(updatedProposal);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Proposal> getProposalById(@PathVariable("id") String proposalId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            Proposal proposal = proposalService.getProposalById(proposalId);
            return ResponseEntity.ok().body(proposal);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProposal(@PathVariable("id") String proposalId, @RequestHeader("Authorization") String authorizationHeader) {
        if (GoogleUtils.isRequestAuthorized(authorizationHeader)) {
            proposalService.deleteProposal(proposalId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }



}
