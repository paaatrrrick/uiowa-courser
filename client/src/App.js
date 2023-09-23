import { useState, useEffect } from 'react';
import './App.css';
import { constants, getUserAuthToken } from './utils/constants';

function App() {
  const getData = async () => {
    console.log('we are here');
    const res = await fetch(`${constants.url}/home`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access'langface-auth-token": getUserAuthToken()
      },
    });
    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    console.log(process.env);
    console.log(process.env.REACT_APP_RUNNING_LOCAL);
    getData();
  }, [])

  return (
    <div className="App">
      <div className="h1">
        Home
      </div>
    </div>
  );
}

export default App;
