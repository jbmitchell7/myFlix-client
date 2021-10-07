import React from "react";
import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./profile-view.scss";

export function ProfileView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const dateConvert = (dateInput) => {
        let year = dateInput.substr(0, 4);
        let month = dateInput.substr(5, 2);
        let day = dateInput.substr(8, 2);
        let date = day + "/" + month + "/" + year;
        return date
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('https://jakesmoviedb.herokuapp.com/users/:Username',
            {
                Username: username,
                Password: password,
                Email: email
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
        )
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/user/:Username', '_self');
            })
            .catch(e => {
                console.log(username)
                console.log('error updating the user')
            });
    };

    return (
        <Form className="user-form">
            <Form.Group controlId="formEmail">
                <Form.Label className="user-text">Email Address:</Form.Label>
                <Form.Control type="text" placeholder="name@example.com" defaultValue={props.profileData.Email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formUsername">
                <Form.Label className="user-text">Username:</Form.Label>
                <Form.Control type="text" placeholder="Must be at least 5 alphanumeric characters" defaultValue={props.profileData.Username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label className="user-text">Password:</Form.Label>
                <Form.Control type="password" placeholder="Must be at least 8 characters" defaultValue={props.profileData.Password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label className="user-birthday">Birthday: {dateConvert(props.profileData.Birthday)}</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Label className="user-favorites">Favorite Movies: {props.profileData.FavoriteMovies}</Form.Label>
                {/* {props.profileData.FavoriteMovies.map((movies) => {
                    return (
                        <div key={movies._id}>
                            <img src={movies.ImagePath} />
                            <Link to={`/movies/${movies._id}`}>
                                <h4>{movies.Title}</h4>
                            </Link>
                        </div>
                    )
                }

                )} */}
            </Form.Group>
            <Form.Group className="profile-btns">
                <Button variant="primary" id="user-submit" type="submit" onClick={handleUpdate}>Update</Button>
                <Button variant="secondary" onClick={() => { props.onBackClick(null); }}>Back</Button>
            </Form.Group>
        </Form >
    );
}