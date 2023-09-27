import Spinner from 'react-bootstrap/Spinner';
import logo from "../assets/unlockit-logo.png"
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

import '../components-css/Load.css';
import '../components-css/Modal.css';

export const ModalLoadWaiting = (props) => {

  const { show } = props;

  console.log(show);

  return (
    <>
      <Modal
        size="sm"
        show={show}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
            <Card className="container-card-load-waiting">
              <Card.Img variant="top" src={logo} className="unlockit-logo-load" alt="unlockit-logo" />
              <Card.Text className="unlockit-card-title">Unlockit</Card.Text>
              <Spinner animation="border" variant="primary" />
            </Card>
        </Modal.Header>
      </Modal>
    </>
  );
}