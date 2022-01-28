import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { TrashFill, HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { setUserData } from "../../actions/actions";
import "./movie-card.scss";

const mapStateToProps = state => {
    const { userData } = state;
    return { userData };
};

function MovieCard(props) {
    const { userData } = props;

    const addFavorite = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        axios.post(`https://jakesmoviedb.herokuapp.com/users/${userData.Username}/movies/${props.movieData._id}`, {}, config)
            .then(res => {
                alert("Added to Favorites");
                props.getUser(token);
                console.log(res.data);
            })
            .catch(e => {
                alert("Error Adding to Favorites");
                console.log('error adding favorite');
                console.log(e);
            });
    };

    const removeFavorite = (e) => {
        e.preventDefault(e);
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        axios.delete(`https://jakesmoviedb.herokuapp.com/users/${userData.Username}/movies/${props.movieData._id}`, config)
            .then(res => {
                alert("Removed from Favorites");
                props.getUser(token);
                console.log(res.data);
            })
            .catch(e => {
                alert("Error Removing from Favorites");
                console.log('error removing favorite');
                console.log(e);
            });
    };

    return (
        <Card className="movie-card" >
            <Card.Body className="movie-card-body">
                <Card.Img variant="top" src={props.movieData.ImagePath} />
                <Card.Title className="movie-card-title">{props.movieData.Title}</Card.Title>
                <div className="card-btns">
                    <Link to={`/myFlix-client/movies/${props.movieData._id}`}>
                        <Button variant="dark" id="view-movie-btn">View Details</Button>
                    </Link>
                    <Button variant="dark" id="add-favorite-btn" onClick={addFavorite}>
                        <HeartFill></HeartFill>
                    </Button>
                    <Button variant="dark" id="remove-favorite-btn" onClick={removeFavorite}>
                        <TrashFill></TrashFill>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )

}



export default connect(mapStateToProps, { setUserData })(MovieCard);