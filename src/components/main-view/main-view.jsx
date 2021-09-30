import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view"
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Col, Row } from "react-bootstrap";

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: false
        };
    }

    componentDidMount() {
        axios.get('https://jakesmoviedb.herokuapp.com/movies')
            .then((response) => {
                this.setState({
                    movies: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegister(register) {
        this.setState({
            register
        });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        if (register)
            return (
                <RegistrationView
                    onRegister={(register) => this.onRegister(register)}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                />
            );

        if (!user)
            return (
                <LoginView
                    onRegister={(register) => this.onRegister(register)}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                />
            );

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Row className="main-view justify-content-md-center">
                {selectedMovie
                    ? (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} 
                                onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    )
                    : movies.map(movie => (
                        <Col md={8}>
                            <MovieCard key={movie._id} movieData={movie} 
                                onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                        </Col>
                    ))
                    
                }
            </Row>
        );
    }
}