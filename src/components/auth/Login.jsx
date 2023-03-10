import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { Form, Button, Box } from 'react-bulma-components';

export default function Login() {
    const { Label, Input } = Form;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        }); 
    }
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);
    return(
        <Box>
            <form>
                <Label>
                    <p>Username</p>
                    <Input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
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
                <Button.Group className="mb-0" align="right">
                    <Button 
                        type="submit"
                        onClick={onLogin}
                        color="primary"
                    >
                        Login
                    </Button>
                </Button.Group>
                <Button.Group align="right">
                    <Link to="/reset">Forgot Password</Link>
                </Button.Group>
                {/* <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div> */}
            </form>
        </Box>
    )
}