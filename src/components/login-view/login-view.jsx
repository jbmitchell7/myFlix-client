import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://jakesmoviedb.herokuapp.com/login', {
            Username: username,
            Password: password,
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
                console.log(`${username} has logged in.`);
            })
            .catch(e => {
                console.log('incorrect credentials')
            });

    };

    return (
        <div>
            <Form className="login-form">
                <Form.Group controlId="formUsername">
                    <Form.Label className="login-text">Username:</Form.Label>
                    <Form.Control required type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label className="login-text">Password:</Form.Label>
                    <Form.Control required type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="dark" id="login-btn" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}