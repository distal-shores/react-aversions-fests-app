import React, { useEffect, useState } from "react";
import './App.scss';
import 'bulma/css/bulma.min.css';
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Container } from 'react-bulma-components';
import { Link, Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const handleLogout = () => {               
    signOut(auth).then(() => {
      // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
        } else {
          navigate('/login');
        }
      });   
  }, [])

  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to={`/dashboard`}>Dashboard</Link>
          </li>
          <li>
            <Link onClick={handleLogout}>
              Logout
            </Link>
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