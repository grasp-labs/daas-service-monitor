/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 * This module contains a component which is responsible for handling user authentication
 * and rendering a login form in the browser that allows users to enter their credentials.
 */
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

/** This login function handles authentication and renders login page. */
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [IsSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  const user = {
    email,
    password,
  };

  /** handleSubmit function, handles post request with sending user's credentials to identity server
   * if user's credentials are valid, saves tokens in local storage and nalavigates to home page.
   * if credentials are not valid, sends the error message back to user.
   *
   * @param {void} e - e is the same as event
   *
   * @returns {string} access_token -token for accessing the home page.
   * @returns {string} refresh_token -is used for refreshing since access token will expire soon.
   * @returns {object} err.response -if credentials are not valid, error message will be returned.
   */
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
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
            />
          </div>

          <div className="form-login__lable">
            <label htmlFor="password">Password</label>
            <br />
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
            />
          </div>

          <div>
            {error && <p className="form-login__ErrorMessage" onSubmit={errorHandler}>{error.message}</p>}
          </div>

          <button className="form-login__button" type="submit">Log in</button>
        </form>

      </div>
    </div>

  );
}
export default Login;
