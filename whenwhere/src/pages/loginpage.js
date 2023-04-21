import React, { useState, useEffect } from 'react';
import './loginpage.css';
import { SubmitButton } from '../components/SubmitButton/SubmitButton';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

      if (!response) {
        setError('Something went wrong. Please try again later!');
      }
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
    <div className="loginPage">
      {error && (
        <div className="alert alert-danger text-center mx-5" role="alert">
          {error}
        </div>
      )}
      {!error && (
        <div className="alert alert-light text-center mx-5" role="alert">
          Your meeting was created. To invite people to this meeting, direct
          them to: <br />
          <span>{window.location.href}</span>
        </div>
      )}
      <form
        className="container col-10 col-md-5 col-lg-4 col-xl-3 loginForm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center">
          <span>{meetingTitle}</span>
        </h2>
        <p className="text-center pb-5">
          Please login to be able to select your availability
        </p>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <SubmitButton className="w-100 my-5 mx-0">Login</SubmitButton>
      </form>
    </div>
  );
}

export default LoginPage;
