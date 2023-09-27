import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

import '../components-css/Modal.css';

export const ModalAdvertise = (props) => {

    const { show, setShow, errors, showSuccess, setShowSuccess, errorsDropdown, setErrorsDropdown, setIsValid} = props;

    const navigate = useNavigate();

    const handleClose = () => {
        setErrorsDropdown([]);
        setShow(false);
        setIsValid(null);
        navigate("/listings");
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
    }

    // console.log("show: ", show);
    // console.log("errors:", errors);
    // console.log("errorsDropdown: ", errorsDropdown);

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    handleClose();
                    handleCloseSuccess();
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
                                <p className="modal-success-text">Your advertise has been successfully published.</p>
                                <p className="modal-success-text">Check your advertise under "<strong>My Listings</strong>" in "<strong>Listings</strong>" page</p>
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
                                {errorsDropdown.length > 0 && (
                                    errorsDropdown.map((error, index) => (
                                        <p className="modal-error-text" key={index}>{error}</p>
                                    ))
                                )}
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