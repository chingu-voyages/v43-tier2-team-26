import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landingpage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const redirectToCreateEventPage = () => {
    navigate('/create-event');
  };
  return (
    <div className="App">
      <header>
        <h1>
          Meeting Scheduling <br></br>Made Easy
        </h1>
      </header>
      <main>
        <section>
          <h5>
            Real time meeting scheduling<br></br> with text reminder
          </h5>
          <div className="button">
            <button className="button" onClick={redirectToCreateEventPage}>
              Schedule Meeting
            </button>
          </div>
        </section>
        <div className="bman-container">
          <div className="bman"></div>
        </div>
        <div className="hajia-container">
          <div className="hajia"></div>
        </div>
        <div className="richman-container">
          <div className="richman"></div>
        </div>
        <div className="suitman-container">
          <div className="suitman"></div>
        </div>
      </main>
      <footer>
        <p>Copyright &copy; WhenWhere 2023</p>
      </footer>
    </div>
  );
};
export default LandingPage;
