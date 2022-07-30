import React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

import '../css/App.css';
import { login } from '../api/signup.api';
import {ReactComponent as Logo} from '../assets/logo-big.svg';
import { LoginResponseData } from '../interfaces/signup.interface';
import {ReactComponent as LoginImage} from '../assets/login-image.svg';

function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const showConfirmEmailmsg = searchParams.get('show_confirm_email_msg') === 'true';

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill the whole form.");
      return;
    }

    login({
      email,
      password
    }).then((resp: AxiosResponse<LoginResponseData>) => {
      localStorage.setItem('refreshToken', resp.data.refreshToken);
      localStorage.setItem('accessToken', resp.data.accessToken);
      localStorage.setItem('isLoggedIn', 'true');

      navigate('/home');
    }).catch( (err:AxiosError<string>) => {
      alert(err.response?.data || "Error loggin in.");
    });

  }

  return <div className="login-wrapper">
    <div className="login-container">
      <div className="form-container">
        <div className="header">
          <h4>Login</h4>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-item">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-item">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}

              required
            />
          </div>

          <div className="form-item">
            <input type="submit"  value="Login" className="submit-btn" />
          </div>
        </form>

        <p>Not a member? Please sign up <Link to="/signup">here</Link></p>

        {
          showConfirmEmailmsg && <p className="login-note">Note: Please confirm the email to log in successfully!</p>
        }
      </div>

      <div className="image-container">
        <Logo className="logo" />

        <LoginImage className="login-image" width={"100%"} />
      </div>
      
    </div>
  </div>
}

export default Login;
