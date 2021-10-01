import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import "./movie-card.scss";


export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;

        return (
            <Card className="movie-card">
                <Card.Body className="movie-card-body">
                    <Card.Img variant="top" src={movieData.ImagePath} />
                    <Card.Title className="movie-card-title">{movieData.Title}</Card.Title>
                    <Button onClick={() => onMovieClick(movieData)} variant="primary" id="view-movie-btn">View Details</Button>
                </Card.Body>
            </Card>
        )
    }
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};