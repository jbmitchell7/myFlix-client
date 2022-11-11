import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import { setMovies, setUserData } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { NavbarView } from "../navbar-view/navbar-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";
import "./main-view.scss";

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: this.props.userData.Username
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://myflixdb.onrender.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                this.props.setMovies(res.data);
            })
            .catch(function (error) {
                console.log(`error getting movies`);
                console.log(error);
            })
    }

    getUser(token) {
        axios.get(`https://myflixdb.onrender.com/users/${this.props.userData.Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                this.props.setUserData(res.data);
            })
            .catch(function (error) {
                console.log(`error getting user`);
                console.log(error);
            })
    };

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username
        });
        this.props.setUserData(authData.user);
        this.getMovies(authData.token);

        localStorage.setItem('token', authData.token);
    }

    onLoggedOut() {
        console.log(`${this.props.userData.Username} is logging out`);
        localStorage.removeItem('token');
        this.setState({
            user: null
        });
    }

    render() {
        const { user } = this.state;
        const { movies } = this.props;

        return (
            <Router>
                <NavbarView onLoggedOut={() => this.onLoggedOut()} user={user} />

                <Row className="router-view justify-content-md-center">
                    <Route exact path="/myFlix-client" render={() => {
                        if (!user)
                            return (
                                <Col>
                                    <h3 className="login-header">Login</h3>
                                    <LoginView
                                        onLoggedIn={(user) => this.onLoggedIn(user)}
                                    />
                                </Col>
                            )
                        if (movies.length === 0) return <div />;
                        return <MoviesList movies={movies} getUser={(token) => this.getUser(token)} />
                    }} />

                    <Route path="/myFlix-client/register" render={({ history }) => {
                        if (user) return <Redirect to="/" />
                        return (
                            <Col>
                                <RegistrationView onBackClick={() => history.goBack()} />
                            </Col>
                        )
                    }} />

                    <Route path="/myFlix-client/movies/:movieId" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movieData={movies.find(movie => movie._id === match.params.movieId)}
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/myFlix-client/directors/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView directorData={movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/myFlix-client/genres/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genreData={movies.find(movie => movie.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/myFlix-client/users/:username" render={({ history }) => {
                        if (!user) return <Redirect to="/" />
                        return <Col md={8}>
                            <ProfileView onBackClick={() => history.goBack()} getUser={(token) => this.getUser(token)} />
                        </Col>
                    }} />
                </Row>
            </Router >
        );
    }
}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        userData: state.userData
    }
}

export default connect(mapStateToProps, { setMovies, setUserData })(MainView);