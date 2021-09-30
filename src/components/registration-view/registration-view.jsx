import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLoggedIn(username);
        props.onRegister(false);
        console.log(`{username} has logged in.`);
    };

    return (
        <div>
            <h3>Create an Account</h3>

            <Form>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group >

                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    );
}