import React, { useState } from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { connect } from 'react-redux';

import FavoriteMovies from "./favoritemovies-view";
import "./profile-view.scss";

const mapStateToProps = state => {
    const { userData } = state;
    return { userData };
};

function ProfileView(props) {
    const { userData } = props;
    const [username, setUsername] = useState(userData.Username);
    const [password, setPassword] = useState(userData.Password);
    const [email, setEmail] = useState(userData.Email);
    const [birthday, setBirthday] = useState(userData.Birthday);

    const token = localStorage.getItem('token');
    const user = userData.Username;

    const dateConvert = (dateInput) => {
        let year = dateInput.substr(0, 4);
        let month = dateInput.substr(5, 2);
        let day = dateInput.substr(8, 2);
        let date = `${year}-${month}-${day}`;
        return date
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const body = { Username: username, Password: password, Email: email, Birthday: birthday }

        axios.put(`https://jakesmoviedb.herokuapp.com/users/${user}`, body, config)
            .then(response => {
                const data = response.data;
                console.log(data);
                console.log(username);
                console.log(email);
                alert("User successfully updated");
            })
            .catch(e => {
                alert("User failed to update");
                console.log('error updating the user');
            });
    };

    const deleteUser = (e) => {
        e.preventDefault();
        axios.delete(`https://jakesmoviedb.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                localStorage.removeItem('token');
                alert('Your account has been deleted.');
                window.open(`/`, '_self');
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
            <Row>
                <Col><h2>Profile Info</h2></Col>
            </Row>
            <Row>
                <Col><Form className="user-form">
                    <Form.Group controlId="formEmail">
                        <Form.Label className="user-text">Email Address:</Form.Label>
                        <Form.Control type="text" placeholder="name@example.com" defaultValue={userData.Email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formUsername">
                        <Form.Label className="user-text">Username:</Form.Label>
                        <Form.Control type="text" placeholder="Must be at least 5 alphanumeric characters" defaultValue={userData.Username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label className="user-text">Password:</Form.Label>
                        <Form.Control type="password" placeholder="Must be at least 8 characters" defaultValue={userData.Password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="user-birthday">Birthday:</Form.Label>
                        <Form.Control type="date" defaultValue={dateConvert(userData.Birthday)} onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="profile-btns">
                        <Button variant="secondary" onClick={() => { props.onBackClick(null); }}>Back</Button>
                        <Button variant="dark" id="user-update-btn" type="submit" onClick={handleUpdate}>Update Account Info</Button>
                        <Button variant="danger" onClick={deleteUser}>Delete Account</Button>
                    </Form.Group>
                </Form>
                </Col>
            </Row>

            <div>
                <FavoriteMovies />
            </div>

        </ >
    );
}

export default connect(mapStateToProps)(ProfileView);