import React from 'react';
import logo from './logo.svg';
import './App.css';
import HexGrid from "./components/HexGrid";

function App() {
  return (
    <div className="App">
      <HexGrid width={600} height={600} hexSize={30} />
    </div>
  );
}

export default App;
