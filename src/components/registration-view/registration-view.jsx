import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleRegister = (e) => {
        axios.post('https://jakesmoviedb.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
            })
            .catch(e => {
                console.log('error registering the user')
            });
    };

    return (
        <div>
            <h3 className="registration-header">Create an Account</h3>

            <Form>
                <Form.Group controlId="formEmail">
                    <Form.Label className="registration-text">Email Address:</Form.Label>
                    <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formUsername">
                    <Form.Label className="registration-text">Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label className="registration-text">Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group >
                <Form.Group controlId="formBirthday">
                    <Form.Label className="registration-text">Birthday:</Form.Label>
                    <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
                </Form.Group >

                <Button variant="primary" id="register-submit" type="submit" onClick={handleRegister}>Register</Button>
            </Form>
        </div>
    );
}