import React from 'react';
import Modal from 'react-modal';

// import SuccessModal from './SuccessModal';
import { createNewTracker } from '../api/tracker.api';
import { ReactComponent as Close } from '../assets/close.svg';
import { NewTrackerInterface } from '../interfaces/trackers.interface';

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

interface ComponentProps {
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void
}

function AddTrackerModal (props: ComponentProps) {
  const [title, setTitle] = React.useState<string>('');
  const [type, setType] = React.useState<string>('1');
  const [totalDays, setTotalDays] = React.useState<string>('7');

  // const successModalFunc = React.useRef(null);
  
  const closeModal = () => {
    props.setModalIsOpen(false);
    setTitle('');
    setType('1');
    setTotalDays('7');
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const requestData: NewTrackerInterface = {
      title,
      tracker_type_id: Number(type),
      status_id: 1,
      total_days: Number(totalDays)
    }

    try {
      await createNewTracker(requestData);
      alert('Progress Tracker Created Successfully!');
      closeModal();
    } catch (err) {
      alert('Error creating Progress Tracker. Make sure the information is correct and try again.');
    }

    
  }

  return <>
    <Modal 
    isOpen={props.modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Add Tracker Modal"
    >
      <div className="add-tracker-modal">
        <Close className="cross-btn" onClick={closeModal} />
        <h4 className="centered-content">New Tracker</h4>
        
        <form className="tracker-form" onSubmit={handleSubmit}>
          <div className="form-item">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-item">
            <label>Type</label>
            <select
            value={type}
            name="type"
            onChange={e => setType(e.target.value)}
            required>
              <option value="1">Goal</option>
              <option value="2">Habit</option>
              <option value="3">Skill</option>
            </select>
          </div>

          <div className="form-item">
            <label>Total Days</label>
            <select
            value={totalDays}
            name="type"
            onChange={e => setTotalDays(e.target.value)}
            required>
              <option value="7">7</option>
              <option value="14">14</option>
              <option value="20">20</option>
            </select>
          </div>

          <div className="form-item">
            <input type="submit"  value="Create" className="submit-btn" />
          </div>
        </form>
      </div>
    </Modal>
    {/* <SuccessModal successModalFunc={successModalFunc} />  */}
  </>
}

export default AddTrackerModal;