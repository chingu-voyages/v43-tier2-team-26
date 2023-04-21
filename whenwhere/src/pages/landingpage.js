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
      <main className="container position-relative">
        <section className="col col-lg-6 d-flex flex-column gap-5 justify-content-center align-items-center align-middle min-vh-100 text-center ">
          <h1>
            Meeting Scheduling <br></br>Made Easy
          </h1>
          <h5>WhereWhen helps you find the best time for a group to meet</h5>
          <div className="button">
            <button className="button" onClick={redirectToCreateEventPage}>
              Schedule Meeting
            </button>
          </div>
        </section>
        <section className="d-none d-lg-block col-md-6 section-gallery align-items-center align-middle">
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
        </section>
      </main>
      <footer>
        <p>Copyright &copy; WhenWhere 2023</p>
      </footer>
    </div>
  );
};
export default LandingPage;
