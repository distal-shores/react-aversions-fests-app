import React from 'react';
import { useRouteError } from "react-router-dom";
import { Container } from 'react-bulma-components';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <Container id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </Container>
    )
}
