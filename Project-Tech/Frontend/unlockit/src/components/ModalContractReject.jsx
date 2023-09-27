import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserEndpoint from '../endpoints/UserEndpoint';
import AdvertiseEndpoint from '../endpoints/AdvertiseEndpoint';
import ProposalEndpoint from '../endpoints/ProposalEndpoint';
import BlockchainEndpoint from '../endpoints/BlockchainEndpoint';
import Auth from '../auth/Auth';
import axios from "axios";

import '../components-css/Modal.css';

export const ModalContractReject = (props) => {

    const { showReject, setShowReject, advertise, proposal, tenant, userId } = props;

    const updateUserByIdUrl = UserEndpoint.updateById;

    const updateAdvertiseByIdUrl = AdvertiseEndpoint.updateById;

    const updateProposalByIdUrl = ProposalEndpoint.updateById;

    const submitBlockchainOrg1 = BlockchainEndpoint.submitBlockchainOrg1ServerUrl;


    const setAdvertiseActiveUsers = (advertise) => {
        const updatedActiveUsers = advertise.activeUsers.filter((id) => id !== proposal.tenantId);
        advertise.activeUsers = updatedActiveUsers;
    }

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

    const setUserProposalAdvertises = (tenant, advertiseId) => {
        const updatedProposalAdvertises = tenant.proposalAdvertises.filter((id) => id !== advertiseId);
        tenant.proposalAdvertises = updatedProposalAdvertises;
    }

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

    const setProposalStatus = (proposal) => {
        proposal.status = "rejected";
    };

    const setProposalInactive = (proposal) => {
        proposal.active = false;
    };

    const handleYes = () => {
        setAdvertiseActiveUsers(advertise);
        updateAdvertiseById(advertise);
        //setUserProposalAdvertises(tenant, advertise.id);
        updateUserById(tenant);
        setProposalStatus(proposal);
        setProposalInactive(proposal);
        updateProposalById(proposal);
        setShowReject(false);
    }

    const handleNo = () => setShowReject(false);

    return (
        <>
            <Modal
                show={showReject}
                onHide={() => {
                    handleNo();
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-error-text-title">Reject Contract</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-success-text">Are you sure you want to reject this contract?</p>
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