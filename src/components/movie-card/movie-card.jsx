import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { TrashFill, HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { setUserData } from "../../actions/actions";
import "./movie-card.scss";

const token = localStorage.getItem('token');
const config = { headers: { Authorization: `Bearer ${token}` } };

class MovieCard extends React.Component {

    getUser() {
        axios.get(`https://jakesmoviedb.herokuapp.com/users/${this.props.userData.Username}`, config)
            .then(res => {
                this.props.setUserData(res.data);
                //console.log(userData);
            })
            .catch(function (error) {
                console.log('got here');
                console.log(error);
            })
    };

    addFavorite = (e) => {
        e.preventDefault();
        axios.post(`https://jakesmoviedb.herokuapp.com/users/${this.props.userData.Username}/movies/${this.props.movieData._id}`, {}, config)
            .then(res => {
                console.log(res.data);
                this.getUser();
                alert("Added to Favorites");
            })
            .catch(e => {
                alert("Error Adding to Favorites");
                console.log('error adding favorite');
                console.log(e);
            });
    };

    removeFavorite = (e) => {
        e.preventDefault(e);
        axios.delete(`https://jakesmoviedb.herokuapp.com/users/${this.props.userData.Username}/movies/${this.props.movieData._id}`, config)
            .then(res => {
                console.log(res.data);
                this.getUser();
                alert("Removed from Favorites");
            })
            .catch(e => {
                alert("Error Removing from Favorites");
                console.log('error removing favorite');
                console.log(e);
            });
    };

    render() {
        const { movieData } = this.props
        return (
            <Card className="movie-card" >
                <Card.Body className="movie-card-body">
                    <Card.Img variant="top" src={movieData.ImagePath} />
                    <Card.Title className="movie-card-title">{movieData.Title}</Card.Title>
                    <div className="card-btns">
                        <Link to={`/movies/${movieData._id}`}>
                            <Button variant="dark" id="view-movie-btn">View Details</Button>
                        </Link>
                        <Button variant="dark" id="add-favorite-btn" onClick={this.addFavorite}>
                            <HeartFill></HeartFill>
                        </Button>
                        <Button variant="dark" id="remove-favorite-btn" onClick={this.removeFavorite}>
                            <TrashFill></TrashFill>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    const { userData } = state;
    return { userData };
};

export default connect(mapStateToProps, { setUserData })(MovieCard);