import React from 'react';
import Modal from 'react-modal';

import '../css/App.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px'
  },
};

function SuccessModal (props: {successModalFunc: React.MutableRefObject<null>}) {
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    // props.successModalFunc.current = setModalIsOpen;
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  style={customStyles}
  contentLabel="Success Modal"
  >
    <div className="modal">
      <h2 className="centered-content">Account Successfully Created</h2>
      <p className="centered-content">Please confirm yout email to activate your account.</p>
      <button className="centered-content modal-btn" onClick={closeModal}>Close</button>
    </div>
  </Modal>
}

export default SuccessModal;
