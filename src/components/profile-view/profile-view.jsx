import React, { useState } from 'react';
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FavoriteMovies } from "./favoritemovies-view";
import "./profile-view.scss";

export function ProfileView(props) {

    const [username, setUsername] = useState(`${props.profileData.Username}`);
    const [password, setPassword] = useState(`${props.profileData.Password}`);
    const [email, setEmail] = useState(`${props.profileData.Email}`);
    const [birthday, setBirthday] = useState(`${props.profileData.Birthday}`);
    const [alert, setAlert] = useState(false);

    const favoriteMovieList = props.movieData.filter((movie) => {
        props.profileData.FavoriteMovies.includes(movie._id);
    })

    const dateConvert = (dateInput) => {
        let year = dateInput.substr(0, 4);
        let month = dateInput.substr(5, 2);
        let day = dateInput.substr(8, 2);
        let date = `${year}-${month}-${day}`;
        return date
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('https://jakesmoviedb.herokuapp.com/users/:Username',
            {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
        )
            .then(response => {
                const data = response.data;
                console.log(data);
                location.reload();
            })
            .catch(e => {
                setAlert(true);
                console.log(alert);
                console.log(username);
                console.log(password);
                console.log(email);
                console.log(birthday);
                console.log('error updating the user');
                location.reload();
            });
    };

    return (
        <div>
            <div> {() => {
                if (alert)
                    return (
                        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                            <Alert.Heading>Login Error</Alert.Heading>
                        </Alert>
                    )
            }}
            </div>
            <h2>Profile Info</h2>
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
                    <Form.Label className="user-birthday">Birthday:</Form.Label>
                    <Form.Control type="date" defaultValue={dateConvert(props.profileData.Birthday)} onChange={e => setBirthday(e.target.value)} />
                </Form.Group>
                <Form.Group className="profile-btns">
                    <Button variant="primary" id="user-submit" type="submit" onClick={handleUpdate}>Update</Button>
                    <Button variant="secondary" onClick={() => { props.onBackClick(null); }}>Back</Button>
                </Form.Group>
            </Form>

            <div className="user-favorites">
                <FavoriteMovies favoriteMovieList={favoriteMovieList} />
            </div>
        </div >
    );
}