import React from "react";
import "./App.css";
import { CreateEvent } from "./pages/CreateEvent/CreateEvent";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Meeting Scheduling <br>
        </br>Made Easy</h1>
      </header>
      <main>
        <section>
          <h2>Real time meeting scheduling<br>
          </br> with text reminder</h2>
        </section>
      </main>
      <footer>
        <p>Copyright &copy; WhenWhere 2023</p>
      </footer>
    </div>
  );
}

export default App;
