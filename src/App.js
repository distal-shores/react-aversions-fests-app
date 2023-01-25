import React from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';
import Preferences from './components/Preferences';
import { Container } from 'react-bulma-components';
import { Link } from "react-router-dom";

function App() {
  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to={`/login`}>Login</Link>
          </li>
          <li>
            <Link to={`/dashboard`}>Dashboard</Link>
          </li>
        </ul>
      </nav>
    </Container>
  )
}

export default App;