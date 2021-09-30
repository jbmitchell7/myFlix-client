import React from "react";
import { Button, Card} from "react-bootstrap";

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
        return (
            <Card className="movie-view">
                <Card.Body>
                    {/* <Card.Img variant="top" className="movie.poster" src={movie.ImagePath} /> */}
                    <Card.Title className="movie-title">{movie.Title}</Card.Title>
                    <Card.Text className="movie-description">Description: {movie.Description}</Card.Text>
                    <Card.Text className="movie-director">Director: {movie.Director.Name}</Card.Text>
                    <Card.Text className="movie-genre">Genre: {movie.Genre.Name}</Card.Text>
                    <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}