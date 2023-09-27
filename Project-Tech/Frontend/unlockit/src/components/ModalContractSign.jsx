import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserEndpoint from '../endpoints/UserEndpoint';
import ContractEndpoint from '../endpoints/ContractEndpoint';
import AdvertiseEndpoint from '../endpoints/AdvertiseEndpoint';
import ProposalEndpoint from '../endpoints/ProposalEndpoint';
import RentalInfoEndpoint from '../endpoints/RentalInfoEndpoint';
import BlockchainEndpoint from '../endpoints/BlockchainEndpoint';
import Auth from '../auth/Auth';
import axios from "axios";

import '../components-css/Modal.css';

export const ModalContractSign = (props) => {

    const { showSign, setShowSign, contract, proposal, proposals, advertise, tenant, userId } = props;

    let rentalInfoData = {};

    const updateUserByIdUrl = UserEndpoint.updateById;

    const updateContractByIdUrl = ContractEndpoint.updateById;

    const updateAdvertiseByIdUrl = AdvertiseEndpoint.updateById;

    const updateProposalByIdUrl = ProposalEndpoint.updateById;

    const registerRentalInfoUrl = RentalInfoEndpoint.register;

    const submitBlockchainOrg1 = BlockchainEndpoint.submitBlockchainOrg1ServerUrl;

    const updateUserById = async (user) => {
        try {
            const url = updateUserByIdUrl + user.id;
            const response = await axios.put(url, user, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("User: ", response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    // const updateContractById = async (contract) => {
    //     try {
    //         const url = updateContractByIdUrl + contract.id;
    //         const response = await axios.put(url, contract, Auth.authHeader());
    //         console.log("Status: ", response.status);
    //         console.log("Contract: ", response.data);
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         console.log(error.response.data);
    //         return false;
    //     }
    // };

    const updateContractById = async (contract, proposal) => {
        try {
            const url = submitBlockchainOrg1;
            const data = {
                fcn: BlockchainEndpoint.updateContractAssetFunction,
                args: [contract.id, proposal.id],
            };
            const response = await axios.post(url, data, Auth.authAndUsernameHeader(userId));
            console.log("Status: ", response.status);
            console.log("Contract: ", response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };
    
    // const setContractProposalTenantId = (contract) => {
    //     contract.tenantId = proposal.tenantId;
    // };

    // const setContractProposalPrice = (contract) => {
    //     contract.price = proposal.proposalPrice;
    // };

    // const setContractSigned = (contract) => {
    //     contract.signed = true;
    // };

    const updateAdvertiseById = async (advertise) => {
        try {
            const url = updateAdvertiseByIdUrl + advertise.id;
            const response = await axios.put(url, advertise, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("Advertise: ", response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setAdvertiseActiveUsersEmpty = (advertise) => {
        advertise.activeUsers = [];
    }

    const setAdvertiseInactive = (advertise) => {
        advertise.active = false;
    }

    // const updateProposalById = async (proposal) => {
    //     try {
    //         const url = updateProposalByIdUrl + proposal.id;
    //         const response = await axios.put(url, proposal, Auth.authHeader());
    //         console.log("Status: ", response.status);
    //         console.log("Proposal: ", response.data);
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         console.log(error.response.data);
    //         return false;
    //     }
    // };

    const updateProposalById = async (proposal) => {
        try {
            const url = submitBlockchainOrg1;
            const data = {
                fcn: BlockchainEndpoint.updateProposalFunction,
                args: [proposal.id, proposal.status],
            };
            const response = await axios.post(url, data, Auth.authAndUsernameHeader(userId));
            console.log("Status: ", response.status);
            console.log("Proposal: ", response.data);
            return true;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            return false;
        }
    };

    const setProposalStatus = (proposal, status) => {
        proposal.status = status;
    };

    const setProposalInactive = (proposal) => {
        proposal.active = false;
    };

    const setProposals = async (proposalsList) => {
        let updatedProposalsList = [];
        for (const currentProposal of proposalsList) {
            if (currentProposal.id !== proposal.id) {
                setProposalStatus(currentProposal, "rejected");
                setProposalInactive(currentProposal);
            }
            else {
                setProposalStatus(currentProposal, "accepted");
                setProposalInactive(currentProposal);
            }
            updatedProposalsList.push(currentProposal);
        }
        console.log(updatedProposalsList);
        return updatedProposalsList;
    };

    const updatedProposals = async (proposalsList) => {
        for (const proposal of proposalsList) {
            await updateProposalById(proposal);
        }
    };

    // const registerRentalInfo = async () => {
    //     try {
    //         setRentalInfoData();

    //         console.log(rentalInfoData);
    //         const response = await axios.post(registerRentalInfoUrl, rentalInfoData, Auth.authHeader());
    //         console.log("Status: ", response.status);
    //         console.log("Rental Info: ", response.data);
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         console.log(error.response.data);
    //         return false;
    //     }
    // };

    const setRentalInfoData = () => {

        rentalInfoData = {
            propertyId: contract.propertyId,
            term: contract.term,
            initialDate: contract.initialDate,
            finalDate: contract.finalDate,
            highestProposal: contract.price,
            numberOfProposals: proposals.length,
        }
    }

    const setTenantContracts = () => {
        let updatedContracts = tenant.tenantContracts;
        updatedContracts.push(contract.id);
        tenant.tenantContracts = updatedContracts;
    }

    const handleYes = async () => {
        setTenantContracts();
        await updateUserById(tenant);
        // setContractSigned(contract);
        // setContractProposalTenantId(contract);
        // setContractProposalPrice(contract);
        await updateContractById(contract, proposal);
        setAdvertiseActiveUsersEmpty(advertise);
        setAdvertiseInactive(advertise);
        await updateAdvertiseById(advertise);
        updatedProposals(await setProposals(proposals));
        // await registerRentalInfo();
        setShowSign(false);
    }

    const handleNo = () => setShowSign(false);

    return (
        <>
            <Modal
                show={showSign}
                onHide={() => {
                    handleNo();
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-success-text-title">Sign Contract</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-success-text">Are you sure you want to sign this contract?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={handleYes}>
                        Yes
                    </Button>
                    <Button variant="outline-danger" onClick={handleNo}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}