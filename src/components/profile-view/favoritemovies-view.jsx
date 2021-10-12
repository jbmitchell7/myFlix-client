import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";
import "./profile-view.scss";

export function FavoriteMovies(props) {
    if (props.favoriteMovieList.length === 0)
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
                {props.favoriteMovieList.map((movie) => {
                    return (
                        <Col lg={6} key={movie._id}>
                            <MovieCard movieData={movie} favoriteMovieList={props.favoriteMovieList} />
                        </Col>
                    )
                }
                )}
            </Row>
        </>
    );
}