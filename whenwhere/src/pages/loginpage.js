import React, { useState } from 'react';
import './loginpage.css';
import { SubmitButton } from '../components/SubmitButton/SubmitButton';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <SubmitButton>Login</SubmitButton>
      <div className="forgot-password">Forgot Password?</div>
    </form>
  );
}

export default LoginPage;
