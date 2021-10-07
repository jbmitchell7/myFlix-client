import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./profile-view.scss";

export function FavoriteMovies(props) {
    if (props.favoriteMovieList.length === 0)
        return (
            <h4>No Favorite Movies</h4>
        )
    return (
        <div>
            <h3>Favorite Movies</h3>
            {props.favoriteMovieList.map((movie) => {
                return (
                    <div key={movie._id}>
                        <img src={movie.ImagePath} />
                        <Link to={`/movies/${movie._id}`}>
                            <h4>{movie.Title}</h4>
                        </Link>
                    </div>

                )
            }
            )}
        </div>
    );
}