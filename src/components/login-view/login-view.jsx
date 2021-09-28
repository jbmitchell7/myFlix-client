import React, { useState } from 'react';

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
        <form>
            <span>No Login? <button onClick={handleRegister}>Register Here!</button>
            </span><br />
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}