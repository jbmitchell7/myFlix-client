import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
            <span>No Login? 
                <button onClick={handleRegister}>Register Here!</button>
            </span><br />
        
        
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
            
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
                </Button>
            </Form>
        </div>
    );
}