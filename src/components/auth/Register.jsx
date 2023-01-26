import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../firebase";
import { Form, Button, Container } from 'react-bulma-components';


export default function Register() {
    const { Label, Input } = Form;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const register = () => {
      if (!name) alert("Please enter name");
      registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
      if (loading) return;
    }, [user, loading]);
    return (
        <Container>
            <div className="register__container">
                <Label>
                    <p>Full Name</p>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                    />
                </Label>
                <Label>
                    <p>E-mail Address</p>
                    <Input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                </Label>
                <Label>
                    <p>Password</p>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Label>
                <Button className="register__btn" onClick={register}>
                    Register
                </Button>
                <div>
                    Already have an account? <Link to="/login">Login</Link> now.
                </div>
            </div>
      </Container>
    )
}