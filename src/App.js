import React from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import { Container } from 'react-bulma-components';



function App() {
  return (
    <Container className="wrapper">
      <Dashboard />
    </Container>
  )
}

export default App;