import React, { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';
import Preferences from './components/Preferences';
import Login from './components/Login';
import { Container } from 'react-bulma-components';
import { Link, Outlet } from "react-router-dom";

function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to={`/dashboard`}>Dashboard</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </Container>
  )
}

export default App;