import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view"
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Button, Col, Row } from "react-bootstrap";
import "./main-view.scss";



export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://jakesmoviedb.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        console.log(`${localStorage.getItem('user')} is logging out`);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <Button variant="primary" id="logout-btn" onClick={() => { this.onLoggedOut() }}>Logout</Button><br />
                <Row className="main-view justify-content-md-center">

                    <Route exact path="/" render={() => {

                        if (!user)
                            return (
                                <Col>
                                    <LoginView
                                        onLoggedIn={(user) => this.onLoggedIn(user)}
                                    />
                                </Col>
                            )
                        if (movies.length === 0) return <div className="main-view" />
                        return movies.map(m => (
                            <Col md={4} key={m._id}>
                                <MovieCard movieData={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/register" render={() => {
                        return (
                            <Col>
                                <RegistrationView />
                            </Col>
                        )
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>
        );
    }
}