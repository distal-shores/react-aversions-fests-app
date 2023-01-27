import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";
import { Form, Button, Box } from 'react-bulma-components';

export default function Reset() {
    const { Label, Input } = Form;
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);
    return (
        <Box>
            <div className="reset__container">
                <Label>
                    <p>E-mail Address</p>
                    <Input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                </Label>
                <Button.Group align="right">
                    <Button
                        onClick={() => sendPasswordReset(email)}
                        color="primary"
                    >
                        Send password reset email
                    </Button>
                </Button.Group>
            </div>
        </Box>
    )
}