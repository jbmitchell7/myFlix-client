import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export class MovieView extends React.Component {
    render() {
        const { movieData, onBackClick } = this.props;
        return (
            <Card>
                <Card.Body className="movie-view">
                    <Card.Img className="movie-poster" src={movieData.ImagePath} />
                    <Card.Title className="movie-title">{movieData.Title}</Card.Title>
                    <Card.Text className="movie-description">Description: {movieData.Description}</Card.Text>
                    <Link className="movie-director" to={`/directors/${movieData.Director.Name}`}>
                        <Card.Text>Director: {movieData.Director.Name}</Card.Text>
                    </Link>
                    <Link className="movie-genre" to={`/genres/${movieData.Genre.Name}`}>
                        <Card.Text>Genre: {movieData.Genre.Name}</Card.Text>
                    </Link>
                    <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}