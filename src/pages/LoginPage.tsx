import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export const LoginPage: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    const success = login(username, password);

    if (success) navigate('/');
    else setError('Invalid credentials');
  };

  return (
  
    <div className="login-container" role="main" aria-labelledby="login-heading">

      <div className="banner">

        <h1 id="login-heading">
          Storefront
        </h1>
      </div>

      <div className="login-form" role="form" aria-label="Login Form">

        <h2>
          Login
        </h2>

        { error && (

          <p className="error" role="alert" aria-live="assertive">
            { error }
          </p> 
        )}

        <form onSubmit={handleSubmit}>

          <label htmlFor="username-input" className="sr-only">
            Username
          </label>

          <input
            id="username-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            aria-required="true" />
          <br />

          <label htmlFor="password-input" className="sr-only">
            Password
          </label>

          <input
            id="password-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            aria-required="true" />
          <br />

          <button type="submit" aria-label="Login to your account">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
