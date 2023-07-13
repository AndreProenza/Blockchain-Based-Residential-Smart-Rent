import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ContractEndpoint from '../endpoints/ContractEndpoint';
import Auth from '../auth/Auth';
import axios from "axios";

import '../components-css/Modal.css';

export const ModalContractSign = (props) => {

    const { showSign, setShowSign, contract } = props;

    const updateContractByIdUrl = ContractEndpoint.updateById;

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

    const setContractSigned = (contract) => {
        contract.signed = true;
    }

    const handleYes = async () => {
        setContractSigned(contract);
        updateContractById(contract);
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