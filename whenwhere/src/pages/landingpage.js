import React from "react";
import "./landingpage.css";


const LandingPage = () => {
    return (
      <div className="App">
        <header>
          <h1>Meeting Scheduling <br>
          </br>Made Easy</h1>
        </header>
        <main>
          <section>
            <h5>Real time meeting scheduling<br>
            </br> with text reminder</h5> 
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
  }
  
  export default LandingPage;
  