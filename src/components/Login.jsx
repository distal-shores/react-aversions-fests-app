import React from 'react';
import { Form, Button, Container } from 'react-bulma-components';

export default function Login() {
    const { Label, Input } = Form;
    return(
        <Container>
            <form>
            <Label>
                <p>Username</p>
                <Input type="text" />
            </Label>
            <Label>
                <p>Password</p>
                <Input type="password" />
            </Label>
            <div>
                <Button type="submit">Submit</Button>
            </div>
            </form>
        </Container>
    )
}
