import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./movie-card.scss";


export class MovieCard extends React.Component {
    render() {
        const { movieData } = this.props;

        return (
            <Card className="movie-card">
                <Card.Body className="movie-card-body">
                    <Card.Img variant="top" src={movieData.ImagePath} />
                    <Card.Title className="movie-card-title">{movieData.Title}</Card.Title>
                    <Link to={`/movies/${movieData._id}`}>
                        <Button variant="primary" id="view-movie-btn">View Details</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    })
};