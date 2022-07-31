import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from 'axios';

import '../css/App.css';
import { signup } from '../api/signup.api';
import {ReactComponent as LoginImage} from '../assets/login-image.svg';
import {ReactComponent as Logo} from '../assets/logo-big.svg';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Signup () {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordMismatch, setPasswordMismatch] = React.useState(false);
  const [isAccountCreated, setIsAccountCreated] = React.useState(false);
  const [accountCreateError, setaccountCreateError] = React.useState('');
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const navigate = useNavigate();

  function closeModal() {
    setModalIsOpen(false);
    navigate("/login?show_confirm_email_msg=true");
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setaccountCreateError('');
    setIsAccountCreated(false);

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      alert("Please fill the whole form.");
      return;
    }

    const data = {
      "first_name": firstName,
      "last_name": lastName,
      "username": username,
      "email": email,
      "password": password
    }

    signup(data)
    .then((result: AxiosResponse<number>) => {
      console.log("Data: ", result);
      
      setModalIsOpen(true);
      setIsAccountCreated(true);
    })
    .catch((err: AxiosError<string>) => {
      console.log("Signup Error:", err);
      
      setaccountCreateError(err.response?.data || '');
    });
  }

  const checkPassword = (event: { target: HTMLInputElement; }) => {
    const passwordToConfirm = event.target.value;
    setConfirmPassword(passwordToConfirm);

    if (passwordToConfirm !== password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  }

  return <>
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="form-container">
          <div className="header">
            <h4>Sign Up</h4>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-item">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-item">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="form-item">
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-item">
              <label>Email</label>
              <input
                type="text"
                name="email"
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-item">
              <label>Password</label>
              <input
                type="password"
                name="firstName"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-item">
              <label>Confirm Password</label>
              <input
                type="password"
                name="firstName"
                onChange={e => checkPassword(e)}
                required
              />
            
            {passwordMismatch && <div className="error-msg">There's a password mismatch!</div>}
            </div>

            <div className="form-item">
              <input disabled={passwordMismatch} type="submit"  value="Confirm" className="submit-btn" />
              
              {/* {isAccountCreated && <div className="success-msg">
                Account created successfully! Please confirm your email to activate the account.
                </div>} */}
              {accountCreateError && <div className="error-msg">
                {accountCreateError}
                </div>}
            </div>
          </form>

          <p>Already a member? Please login <Link to="/login">here</Link></p>


        </div>

        <div className="image-container">
          <Logo className="logo" />

          <LoginImage className="login-image" width={"100%"} />
        </div>
        
      </div>
    </div>
    
    <>
    <Modal
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
    </>
  </>
}

export default Signup;
