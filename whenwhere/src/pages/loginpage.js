import React, { useState, useEffect } from 'react';
import './loginpage.css';
import { SubmitButton } from '../components/SubmitButton/SubmitButton';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const getMeetingById = async () => {
    try {
      const response = await fetch(`/w/viewevent/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      setMeetingTitle(responseData.meeting_title);
    } catch (err) {
      throw new Error('Problem with fetching meeting');
    }
  };

  useEffect(() => {
    getMeetingById();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await fetch('/w/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email: email, password: password },
        }),
      });

      const response = await fetch('/w/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email: email, password: password },
        }),
      });
      const responseData = await response.json();
      navigate(`/${id}/select-availability/${responseData.userId}`);
    } catch (err) {
      throw new Error('Problem with signin user');
    }
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <div className="text-light">{meetingTitle}</div>
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
