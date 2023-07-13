import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserEndpoint from '../endpoints/UserEndpoint';
import AdvertiseEndpoint from '../endpoints/AdvertiseEndpoint';
import ContractEndpoint from '../endpoints/ContractEndpoint';
import Auth from '../auth/Auth';
import axios from "axios";

import '../components-css/Modal.css';

export const ModalContractReject = (props) => {

    const { showReject, setShowReject, advertise, contract, tenant } = props;

    const updateUserByIdUrl = UserEndpoint.updateById;

    const updateAdvertiseByIdUrl = AdvertiseEndpoint.updateById;

    const updateContractByIdUrl = ContractEndpoint.updateById;

    const setAdvertiseActive = (advertise) => {
        advertise.active = true;
    }

    const setContractTenantId = (contract) => {
        contract.tenantId = null;
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

    const updateContractById = async (contract) => {
        try {
            const url = updateContractByIdUrl + contract.id;
            const response = await axios.put(url, contract, Auth.authHeader());
            console.log("Status: ", response.status);
            console.log("Contract: ", response.data);
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

    const handleYes = () => {
        setAdvertiseActive(advertise);
        updateAdvertiseById(advertise);
        setContractTenantId(contract);
        updateContractById(contract);
        setUserProposalAdvertises(tenant, advertise.id);
        updateUserById(tenant);
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