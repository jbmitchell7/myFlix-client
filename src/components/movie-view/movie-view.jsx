import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export function MovieView(props) {
    return (
        <Card>
            <Card.Body className="movie-view">
                <Card.Img className="movie-poster" src={props.movieData.ImagePath} />
                <Card.Title className="movie-title">{props.movieData.Title}</Card.Title>
                <Card.Text className="movie-description">Description: {props.movieData.Description}</Card.Text>
                <Link className="movie-director" to={`/myFlix-client/directors/${props.movieData.Director.Name}`}>
                    <Card.Text>Director: {props.movieData.Director.Name}</Card.Text>
                </Link>
                <Link className="movie-genre" to={`/myFlix-client/genres/${props.movieData.Genre.Name}`}>
                    <Card.Text>Genre: {props.movieData.Genre.Name}</Card.Text>
                </Link>
                <Button variant="secondary" onClick={() => { props.onBackClick(null); }}>Back</Button>
            </Card.Body>
        </Card>
    );
}