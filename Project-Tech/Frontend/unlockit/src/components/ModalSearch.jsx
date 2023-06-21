import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import '../components-css/Modal.css';

export const ModalSearch = (props) => {

  const { show, setShow } = props;

  const handleClose = () => setShow(false);

  console.log(show);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-error-text-title">Invalid location</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-error-text-search">
          Please insert a valid location. <br/> Example: 
          <span className="modal-text-color"> Lisbon</span>, 
          <span className="modal-text-color"> Porto</span>, 
          <span className="modal-text-color"> Coimbra</span>, 
          <span className="modal-text-color"> Braga</span>, 
          <span className="modal-text-color"> Faro</span>.
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