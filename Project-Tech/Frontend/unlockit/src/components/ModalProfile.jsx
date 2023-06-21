import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import '../components-css/Modal.css';

export const ModalProfile = (props) => {

    const { show, setShow, errors, setErrors, showSuccess, setShowSuccess } = props;

    const handleClose = () => setShow(null);

    const handleCloseSuccess = () => setShowSuccess(false);

    const handleCloseErrors = () => setErrors({});

    console.log("show: ", show);

    console.log("errors: ", errors);

    console.log("showSuccess: ", showSuccess);

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    handleClose();
                    handleCloseSuccess();
                    handleCloseErrors();
                }}
                backdrop="static"
                keyboard={false}
            >
                {showSuccess ? 
                    (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title className="modal-success-text-title">Success</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="modal-success-text">Your information has been successfully updated.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" className="button-modal" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </>
                    ) :
                    (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title className="modal-error-text-title">Invalid Fields</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="modal-error-text-subtitle">Please fill in all the fields</p>
                                {errors && errors.inner ? (
                                    errors.inner.map((error, index) => (
                                        <p className="modal-error-text" key={index}>{error.message}</p>
                                    ))
                                ) : (
                                    <></>
                                )}
                                <p className="modal-error-text-subtitle">Make sure you only click "Apply" if all fields are correct</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" className="button-modal" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </>
                    )
                }
            </Modal>
        </>
    );
}