import React, { useEffect, useState } from "react";
import './App.scss';
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Container, Navbar, Button } from 'react-bulma-components';
import { Link, Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const handleLogout = () => {               
    signOut(auth).then(() => {
        navigate("/");
    }).catch((error) => {
    });
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
        } else {
          navigate('/login');
        }
      });   
  }, [])

  return (
    <Container>
      <Navbar>
        <Navbar.Brand>
          <Navbar.Item href={`/fests`}>Festivals</Navbar.Item>
        </Navbar.Brand>
        <Navbar.Container align="right">
          <Button color="warning" size="small" onClick={handleLogout}>Logout</Button>
        </Navbar.Container>
      </Navbar>
      <div>
        <Outlet />
      </div>
    </Container>
  )
}

export default App;