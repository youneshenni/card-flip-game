import React from "react";
import { connect } from "react-redux";
import "./App.css";
import Cards from "./Cards";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: "white" }}>Find the pair</h1>
      </header>
      <Cards />
    </div>
  );
}

export default App;
