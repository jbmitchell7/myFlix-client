import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { TrashFill, BookmarkPlus } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./movie-card.scss";


export function MovieCard(props) {

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const addFavorite = (e) => {
        e.preventDefault();
        axios.post(`https://jakesmoviedb.herokuapp.com/users/${user}/movies/${props.movieData._id}`, {}, headers)
            .then(response => {
                alert("Added to Favorites");
            })
            .catch(e => {
                alert("Error Adding to Favorites");
                console.log('error adding favorite');
            });
    };

    const removeFavorite = (e) => {
        e.preventDefault();
        axios.delete(`https://jakesmoviedb.herokuapp.com/users/${user}/movies/${props.movieData._id}`, {}, headers)
            .then(response => {
                alert("Removed from Favorites");
            })
            .catch(e => {
                alert("Error Removing from Favorites");
                console.log('error removing favorite');
            });
    };


    return (
        <Card className="movie-card">
            <Card.Body className="movie-card-body">
                <Card.Img variant="top" src={props.movieData.ImagePath} />
                <Card.Title className="movie-card-title">{props.movieData.Title}</Card.Title>
                <div className="card-btns">
                    <Link to={`/movies/${props.movieData._id}`}>
                        <Button variant="dark" id="view-movie-btn">View Details</Button>
                    </Link>
                    <Button variant="dark" id="add-favorite-btn" onClick={addFavorite}><BookmarkPlus></BookmarkPlus></Button>
                    <Button variant="dark" id="remove-favorite-btn" onClick={removeFavorite}><TrashFill></TrashFill></Button>
                </div>
            </Card.Body>
        </Card>
    )

}