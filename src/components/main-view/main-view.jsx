import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view"
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { Col, Row, Navbar, Nav } from "react-bootstrap";
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
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Navbar.Brand>JakesMovieDB</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to={`/users/${user}`} className="nav-link">View Profile</Link>
                            <Nav.Link onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link><br />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <nav className="navbar">

                </nav>
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
                        if (user) return <Redirect to="/" />
                        return (
                            <Col>
                                <RegistrationView />
                            </Col>
                        )
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movieData={movies.find(movie => movie._id === match.params.movieId)}
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView directorData={movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genreData={movies.find(movie => movie.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/users/:username" render={({ match, history }) => {
                        return <Col md={8}>
                            <ProfileView profileData={user.find(user => user === match.params.username)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router >
        );
    }
}