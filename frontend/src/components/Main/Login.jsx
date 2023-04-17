/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login() {
  const [EnteredEmail, setEnteredEmail] = useState('');
  const [EnteredPassword, setEnteredPassword] = useState('');
  const [error, setError] = useState();
  const [IsSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const user = {
    email: EnteredEmail,
    password: EnteredPassword,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://auth-dev.grasp-daas.com/rest-auth/login/', {
      email: user.email,
      password: user.password,
    })
      .then((data) => {
        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token);
        if (IsSignedIn === false) {
          setIsSignedIn(true);
        }
        navigate('/Home');
      }).catch((err) => {
        setError({
          message: 'Incorrect username or password.',
        });
        return err.response;
      });
  };
  const errorHandler = () => {
    setError('null');
  };
  return (

    <div className="body" id="login">

      <div>
        <form className="form-login" method="post" onSubmit={handleSubmit}>

          <div className="form-login__lable">
            <label htmlFor="email">Email</label>
            <br />
            <input id="email" data-testid="Email" value={EnteredEmail} onChange={(e) => setEnteredEmail(e.target.value)} type="email" name="email" />
          </div>

          <div className="form-login__lable">
            <label htmlFor="password">Password</label>
            <br />
            <input id="password" value={EnteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} type="password" name="password" />
          </div>

          <div>
            {error && <p className="form-login__ErrorMessage" onConfirm={errorHandler}>{error.message}</p>}
          </div>

          <button className="form-login__button" type="submit">Log in</button>
        </form>

      </div>
    </div>

  );
}
export default Login;
