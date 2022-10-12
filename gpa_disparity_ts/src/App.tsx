import React from 'react';
//for useState hook
import { useState } from 'react';
import logo from './logo.svg';

import './App.css';

/*
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//should be for subjects
export default function BasicSelect() {
  const [subject, setSubject] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value as string);
  };

      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>

*/

//RequestSubjectsFromPythonAPI -> list(subjects for DropDown Selector)
//RequestGPAInformationFromPythonAPI-> list(GPA info for a graph component)

function App() {
  return (

    <div className="App">
      <header className="App-header">
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
