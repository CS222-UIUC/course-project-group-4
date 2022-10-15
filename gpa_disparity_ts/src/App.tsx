import React from 'react';
//for useState hook
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DropDown from './dropdown';


function retrieveSubjectsFromDB() {
  return ["CS", "ECE", "ME", "MEB"];
}


function App() {
  const [subject, setSubject] = React.useState<string | number>(0);
  return (
    <div className="App">
      <header className="App-header">
        <DropDown retrieveMenuItems={retrieveSubjectsFromDB} value={subject} setValue={setSubject} label="Subject"/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          "hello world again"
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >x
          Learn React
        </a>
      </header>
    </div>
  );
}


export default App;
