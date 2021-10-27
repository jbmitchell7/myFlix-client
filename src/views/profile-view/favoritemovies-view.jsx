import React from "react";
import MovieCard from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import "./profile-view.scss";

function FavoriteMovies(props) {

    const { userData, movies } = props;

    if (userData.FavoriteMovies.length === 0)
        return (
            <h4>No Favorite Movies</h4>
        )
    return (
        <>
            <Row>
                <Col>
                    <h3>Favorite Movies</h3>
                </Col>
            </Row>
            <Row>
                {movies.map((movie) => {
                    if (movie._id === userData.FavoriteMovies.find((m) =>
                        m === movie._id)) {
                        return (
                            <Col lg={6} key={movie._id}>
                                <MovieCard movieData={movie} getUser={props.getUser} />
                            </Col>
                        )
                    }
                }
                )}
            </Row>
        </>
    );
}

const mapStateToProps = state => {
    const { userData, movies } = state;
    return { userData, movies };
};

export default connect(mapStateToProps)(FavoriteMovies);