import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLoggedIn(username);
        props.onRegister(false);
        console.log(`${username} has logged in.`);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        props.onRegister(true);
        console.log(`New user is going to register.`);
    }

    return (
        <div>
            <h5 className="login-header">No Login?</h5>

            <Button variant="primary" id="register-btn" onClick={handleRegister}>Register Here!</Button>

            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label className="login-text">Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label className="login-text">Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" id="login-btn" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}