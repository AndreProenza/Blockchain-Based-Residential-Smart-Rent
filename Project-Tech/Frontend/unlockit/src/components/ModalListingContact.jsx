import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import '../components-css/Modal.css';

export const ModalListingContact = (props) => {

    const { showContact, setShowContact, landlord } = props;

    const handleClose = () => setShowContact(false);

    console.log("showContact: ", showContact);

    return (
        <>
            <Modal
                show={showContact}
                onHide={() => {
                    handleClose();
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-text-title">Contact Landlord</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-success-text">Landlord Name: <span className="modal-text-color">{landlord.firstName} {landlord.lastName}</span> </p>
                    <p className="modal-success-text">Phone Number: <span className="modal-text-color">{landlord.phone}</span></p>
                    <p className="modal-success-text">Email: <span className="modal-text-color">{landlord.email}</span></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="button-modal" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}