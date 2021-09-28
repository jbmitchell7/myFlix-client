import React, { useState } from 'react';

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
        <form>
            <h3>
                Create an Account
            </h3>
            <label>
                Email Address:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </label><br />
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label><br />
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label><br />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}